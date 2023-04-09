import moment from "moment"

export default function Footer() {
    return (
        <div className="max-w-[45rem] mx-auto px-6 mb-12 mt-8">
            <div className="flex justify-center mb-8 opacity-75">
                <svg width="18" height="18" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM12.5 8.625C13.1213 8.625 13.625 8.12132 13.625 7.5C13.625 6.87868 13.1213 6.375 12.5 6.375C11.8787 6.375 11.375 6.87868 11.375 7.5C11.375 8.12132 11.8787 8.625 12.5 8.625Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
            </div>
            <div className="flex flex-row justify-between">
                <div className="">
                    <p>
                        Enjoy {moment().format('dddd')}
                    </p>
                    <p className="mt-2">
                        Yantai City, SD
                    </p>
                </div>
                <div className="opacity-75">
                    Freedom is slavery
                </div>
            </div>
        </div>
    )
}