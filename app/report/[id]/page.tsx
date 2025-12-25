// import { ReportRead } from "../admin/ReportReader";
// import { QuestionsData } from "../quiz/Questions";
import { ReportRead } from "./reportViewerHelper";
import { QuestionsData } from "./reportViewerHelper";


export default async function ReportPage({ params, }: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  // console.log('Report ID:', id);
  console.log(' The id of the parmas/ latest report is : ', id);
  const [report] = await ReportRead(id);
  console.log("The report fetched in report page.tsx is : ", report);
  // const report = reports[reports.length - 1];
  const questions = await QuestionsData();
  console.log("The questions fetched in report page.tsx are : ", questions);

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
            <span className="font-semibold">User:</span> {report.username}
          </p>
          <p className="text-lg text-gray-700">
            <span className="font-semibold">Date:</span> {new Date(report.date).toLocaleString()}
          </p>
        </div>

        {/* Answers */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Answers Summary
        </h2>

        {/* { this si the actualy report} */}
        {/* This is the actual report */}
        <div className="space-y-6">
          {Object.entries(JSON.parse(report.answers)).map(([qIndex, userAns]: any) => {
            const q = questions[Number(qIndex)];

            // Defensive check
            if (!q || !q.correctAnswers) return null;

            // Ensure userAns is an array if multiple answers allowed
            const userAnswers = Array.isArray(userAns) ? userAns : [userAns];

            // Mark correct only if ALL correctAnswers are selected and nothing extra
            const isCorrect =
              q.correctAnswers.length === userAnswers.length &&
              q.correctAnswers.every((ans: string) => userAnswers.includes(ans));

            return (
              <div
                key={qIndex}
                className="border rounded-lg p-5 bg-gray-50 shadow-sm"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Question {Number(qIndex) + 1}
                </h3>

                <p className="text-gray-800 font-medium mb-2">{q.question}</p>

                <p className="text-gray-700">
                  <span className="font-semibold">Your Answer:</span>{" "}
                  <span className="text-blue-700">{userAnswers.join(", ")}</span>
                </p>

                <p className="text-gray-700 mt-1">
                  <span className="font-semibold">Correct Answer:</span>{" "}
                  <span className="text-green-700">{q.correctAnswers.join(", ")}</span>
                </p>

                <p
                  className={`mt-3 text-lg font-bold ${isCorrect ? "text-green-600" : "text-red-600"
                    }`}
                >
                  {isCorrect ? "✔ Correct" : "✘ Incorrect"}
                </p>
              </div>
            );
          })}
        </div>

        {/* { this si the actualy report} */}

      </div>
    </div>
  );
}
