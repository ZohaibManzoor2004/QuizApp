import { ReportRead } from "../admin/ReportReader";
import { QuestionsData } from "../quiz/Questions";

export default async function ReportPage() {

  const reports = await ReportRead(); 
  const latestReport = reports[reports.length - 1];
  const questions = await QuestionsData();

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-6">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-xl p-8">

        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">
          Quiz Report
        </h1>

        {/* User Info */}
        <div className="bg-gray-50 p-4 rounded-lg border mb-6">
          <p className="text-lg text-gray-700">
            <span className="font-semibold">User:</span> {latestReport.username}
          </p>
          <p className="text-lg text-gray-700">
            <span className="font-semibold">Date:</span> {latestReport.date}
          </p>
        </div>

        {/* Answers */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Answers Summary
        </h2>

        <div className="space-y-6">
          {Object.entries(latestReport.answers).map(([qIndex, userAns]: any) => {
            const q = questions[Number(qIndex)];
            const isCorrect = q.correctAnswers.includes(userAns);

            return (
              <div 
                key={qIndex} 
                className="border rounded-lg p-5 bg-gray-50 shadow-sm"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Question {Number(qIndex) + 1}
                </h3>

                <p className="text-gray-800 font-medium mb-2">
                  {q.question}
                </p>

                <p className="text-gray-700">
                  <span className="font-semibold">Your Answer:</span>{" "}
                  <span className="text-blue-700">{userAns}</span>
                </p>

                <p className="text-gray-700 mt-1">
                  <span className="font-semibold">Correct Answer:</span>{" "}
                  <span className="text-green-700">
                    {q.correctAnswers.join(", ")}
                  </span>
                </p>

                <p
                  className={`mt-3 text-lg font-bold ${
                    isCorrect ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {isCorrect ? "✔ Correct" : "✘ Incorrect"}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
