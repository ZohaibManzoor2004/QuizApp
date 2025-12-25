
// import React, { use } from 'react';
import { reportFetcher } from './ReportReader';
import Link from 'next/link';
// import { useUserStore } from "../../components/stores/userStore";
// import { AdminAuth } from './ReportReader';
// import { useRouter } from 'next/navigation';
// const router = useRouter();

type Props = {}

export default async function AdminPage({ }: Props) {
// const username = useUserStore((state) => state.username);
// console.log("Username from admin page is : ",username);
    // const auth = AdminAuth();
    // if (!auth.authorized) {
    //     router.replace('/login');
    //     return <div className="min-h-screen flex items-center justify-center">
    //         <h2 className="text-2xl font-semibold text-red-600">Unauthorized Access. Admins Only.</h2>
    //     </div>
    // }
    
    let nOfReports = await reportFetcher()
    console.log("Report read function returned data is : ", nOfReports);
      return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        Welcome To Admin Panel
                    </h1>
                    <p className="text-gray-600">
                        Manage reports and questions from here
                    </p>
                </div>

                {/* Navigation Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Link 
                        href='admin/viewReport' 
                        className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 hover:border-blue-300"
                    >
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">View Reports</h3>
                        <p className="text-gray-600">Check and analyze user reports</p>
                    </Link>

                    <Link 
                        href='admin/EditQuestions' 
                        className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 hover:border-blue-300"
                    >
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Edit Questions</h3>
                        <p className="text-gray-600">Modify existing questions</p>
                    </Link>

                    <Link 
                        href='admin/addQuestions' 
                        className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 hover:border-blue-300"
                    >
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Add Questions</h3>
                        <p className="text-gray-600">Create new questions</p>
                    </Link>
                </div>

                {/* Optional: Data Summary */}
                {nOfReports && (
                    <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Reports Summary</h3>
                        <p className="text-gray-600">
                            Total reports: {nOfReports}
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}




























// import React from 'react';
// import { ReportRead } from './ReportReader';

// type Props = {}

// export default async function AdminPage({ }: Props) {
//     let data = await ReportRead()
//     console.log("Report read function returned data is : ", data);
//     return (
//         <div>
//             <div>Username : {data.username}</div>
//             <h2>Answers</h2>
//             {data.array.forEach((answer:any) => { 
                
//             })}
//         </div>
//     )
// }