import Layout from "../components/Layout"
import Link from "next/link"

export default function Collection() {
    return (
        <Layout title="Collection">
            <Link href="/" className="opacity-75 text-sm sm:text-base">← Back to home</Link>

            <h1 className="mt-8 serif">Collection</h1>

            <p className="mt-8">Here includes a little items I collected, ranging from top to toe.</p>
            
            <div className="mt-12 flex flex-col sm:flex-row space-x-0 space-y-6 sm:space-y-0 sm:space-x-6 overflow-x-auto">
                <div className="opacity-100 w-full sm:w-1/2">
                    <img src="/collection/jj.jpg" className="rounded-lg" />
                </div>
                <div className="w-full sm:w-1/2">
                    <h2 className="text-3xl sm:text-4xl serif">Jiang Jie</h2>

                    <p className="mt-4">(47 years old till 2023)</p>

                    <p className="mt-6">
                        姜杰，中共党员，教育硕士，一级教师。先后获得芝罘名师，芝罘区优秀班主任，烟台市高中教学先进个人，烟台市高中物理学科带头人等荣誉称号。教育教学讲究方式方法，注重学生学习兴趣的培养和学习方法的传授，课堂教学效果好，先后获得芝罘区、烟台市、山东省高中物理优质课一等奖。多次在烟台市高中物理高考研讨会上主讲示范课，做典型经验交流。
                    </p>
                </div>
            </div>

            <div className="flex justify-center my-8 opacity-75">
                <svg width="18" height="18" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM12.5 8.625C13.1213 8.625 13.625 8.12132 13.625 7.5C13.625 6.87868 13.1213 6.375 12.5 6.375C11.8787 6.375 11.375 6.87868 11.375 7.5C11.375 8.12132 11.8787 8.625 12.5 8.625Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
            </div>

            <div className="mt-12 flex flex-col sm:flex-row space-x-0 space-y-6 sm:space-y-0 sm:space-x-6 overflow-x-auto">
                <div className="opacity-100 w-full sm:w-1/2">
                    <img src="/collection/wgj.jpeg" className="rounded-lg" />
                </div>
                <div className="w-full sm:w-1/2">
                    <h2 className="text-3xl sm:text-4xl serif">Wang Guijiang</h2>

                    <p className="mt-4">(About 48 years old till 2023)</p>

                    <p className="mt-6">
                        王贵江 ，山东新泰人，1997年毕业于山东师范大学数学教育专业，中学一级教师。从教以来，工作严谨扎实，成绩突出。在教学工作中一直侧重于习惯的养成与智力的开发，幽默的上课风格受到广大同学的热烈欢迎。业余时间辅导学生学习数学竞赛，有多人次获得一等奖，在烟台市名列前茅，其中2014年辅导的姜伟东同学进入山东代表队获得CMO铜牌。
                    </p>
                </div>
            </div>

            <div className="flex justify-center my-8 opacity-75">
                <svg width="18" height="18" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM12.5 8.625C13.1213 8.625 13.625 8.12132 13.625 7.5C13.625 6.87868 13.1213 6.375 12.5 6.375C11.8787 6.375 11.375 6.87868 11.375 7.5C11.375 8.12132 11.8787 8.625 12.5 8.625Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
            </div>

            <div className="mt-12 flex flex-col sm:flex-row space-x-0 space-y-6 sm:space-y-0 sm:space-x-6 overflow-x-auto">
                <div className="opacity-100 w-full sm:w-1/2">
                    <img src="/collection/wgj-rain.jpg" className="rounded-lg w-full" />
                </div>
                <div className="w-full sm:w-1/2">
                    <h2 className="text-3xl sm:text-4xl serif">Wang Guijiang</h2>

                    <p className="mt-4">(About 48 years old till 2023)</p>

                    <p className="serif mt-6">This is another picture of Wang Guijiang.</p>

                    <p className="mt-4">Shot on around July 2020.</p>
                </div>
            </div>

            <div className="flex justify-center my-8 opacity-75">
                <svg width="18" height="18" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM12.5 8.625C13.1213 8.625 13.625 8.12132 13.625 7.5C13.625 6.87868 13.1213 6.375 12.5 6.375C11.8787 6.375 11.375 6.87868 11.375 7.5C11.375 8.12132 11.8787 8.625 12.5 8.625Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
            </div>

            <div className="mt-12 flex flex-col sm:flex-row space-x-0 space-y-6 sm:space-y-0 sm:space-x-6 overflow-x-auto">
                <div className="opacity-100 w-full sm:w-1/2">
                    <img src="/collection/cmf.jpg" className="rounded-lg w-full" />
                </div>
                <div className="w-full sm:w-1/2">
                    <h2 className="text-3xl sm:text-4xl serif">Cui Manfu</h2>

                    <p className="mt-4">(About 50 years old till 2023)</p>

                    <p className="mt-6">崔满富，山东蓬莱人，1995年毕业于烟台师范学院汉语言文学专业，中学一级教师。
                        2011年获烟台市高中教学先进个人。</p>

                    <p className="serif mt-6">Smoking constantly.</p>

                </div>
            </div>







        </Layout>
    )
}