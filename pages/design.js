import Layout from "../components/Layout"
import { useState } from 'react'
import { Switch } from '@headlessui/react'

export default function Design() {
    const [enabled, setEnabled] = useState(false)
    return (
        <Layout title="Design">
            <h2 className="text-5xl md:text-7xl sm:text-7xl">Design.</h2>

            <h2 className="text-5xl md:text-7xl sm:text-7xl">Clear your mind.</h2>


            <p className="max-w-2xl mt-24">
                This is a collection of design I've done, or is going to be done. I share them here to spread my passion for design.
                My inner spirit is "simplest is the best".
            </p>

            <br />

            <div className="mt-16 max-w-3xl">

                <h3 className="text-sm">Headings</h3>

                <div className="rounded-3xl bg-[#62A962] px-6 py-8">

                    <h2 className="inter font-semibold text-3xl md:text-5xl sm:text-5xl">The quick brown fox jumps over a lazy dog</h2>

                    <h2 className="inter font-semibold text-2xl md:text-4xl sm:text-4xl">The quick brown fox jumps over a lazy dog</h2>

                    <h2 className="inter font-semibold text-xl md:text-3xl sm:text-3xl">The quick brown fox jumps over a lazy dog</h2>

                    <h2 className="inter font-semibold text-lg md:text-2xl sm:text-2xl">The quick brown fox jumps over a lazy dog</h2>

                    <h2 className="inter font-semibold text-base md:text-xl sm:text-xl">The quick brown fox jumps over a lazy dog</h2>


                </div>

                <h3 className="text-sm">Typography</h3>

                <div className="rounded-3xl bg-[#62A962] px-6 py-8">
                    <p className="">
                        Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>

                    <p className="">
                        Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>


                    <button className="inter bg-[#B9DDB0] rounded-3xl mt-4 px-8 py-2 flex flex-row space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="text-red-600  w-6 h-6">
                            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                        </svg>
                        <i>Like this post</i>

                    </button>
                </div>


                <h3 className="text-sm">Button</h3>
                <div className="overflow-x-auto">
                    <div className="rounded-3xl bg-[#62A962] px-6 py-8 flex flex-row space-x-8 md:w-full sm:w-full w-96 overflow-x-auto">

                        <div className="w-96">

                            <i className="ml-4">Primary</i>

                            <button className="inter bg-[#B9DDB0] rounded-3xl mt-4 px-8 py-2 flex flex-row space-x-2">
                                <span>Love me do</span>
                            </button>

                            <br />

                            <i className="ml-4">Animated</i>

                            <button className="inter bg-[#B9DDB0] hover:bg-white transition-all duration-300 rounded-3xl mt-4 px-8 py-2 flex flex-row space-x-2">
                                <span>Love me do</span>
                            </button>

                            <br />

                            <i className="ml-4">Unstyled</i>

                            <button className="inter px-8 py-2 bg-white mt-4 flex flex-row space-x-2">
                                <span>Love me do</span>
                            </button>

                        </div>

                        <div className="w-96">
                            <i className="ml-4">Warning</i>

                            <button className="inter bg-yellow-400 rounded-3xl mt-4 px-8 py-2 flex flex-row space-x-2">
                                <span>Love me do</span>
                            </button>

                            <br />

                            <i className="ml-4">Error</i>

                            <button className="inter bg-red-600 rounded-3xl mt-4 px-8 py-2 flex flex-row space-x-2">
                                <span>Love me do</span>
                            </button>

                            <br />

                            <i className="ml-4">Successful</i>

                            <button className="inter bg-cyan-600 rounded-3xl mt-4 px-8 py-2 flex flex-row space-x-2">
                                <span>Love me do</span>
                            </button>
                        </div>
                    </div>
                </div>

                <h3 className="text-sm">Image</h3>

                <div className="rounded-3xl bg-[#62A962] px-6 py-8">

                    <img src="/static/green.png" className="rounded-3xl" />

                    <span className="mono text-sm">A gradient photo generated by AI.</span>

                    <button className="inter bg-[#B9DDB0] rounded-3xl mt-4 px-8 py-2 flex flex-row space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="text-red-600  w-6 h-6">
                            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                        </svg>
                        <i>Like this photo</i>

                    </button>
                </div>

                <h3 className="text-sm">Input & Textarea</h3>

                <div className="rounded-3xl bg-[#62A962] px-6 py-8">

                    <div className="flex flex-row">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="absolute mt-2.5 ml-3 w-5 h-5">
                            <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clipRule="evenodd" />
                        </svg>

                        <input
                            type="search"
                            className="inter focus:ring-4 focus:outline-none focus:ring-green-300 bg-[#B9DDB0] rounded-3xl focus:bg-white px-10 py-2" placeholder="Type to search"
                        />
                    </div>


                    <textarea className="bg-[#B9DDB0] rounded-3xl focus:bg-white inter focus:ring-4 focus:outline-none focus:ring-green-300 mt-8 px-4 py-4 w-full min-h-[20rem]" placeholder="Leave a comment" />

                </div>

                <h3 className="text-sm">Toogle</h3>

                <div className="rounded-3xl bg-[#62A962] px-6 py-8">

                    <Switch
                        checked={enabled}
                        onChange={setEnabled}
                        className={`${enabled ? 'bg-green-600' : 'bg-gray-200'
                            } relative inline-flex h-6 w-11 items-center rounded-full`}
                    >
                        <span className="sr-only">Enable notifications</span>
                        <span
                            className={`${enabled ? 'translate-x-6' : 'translate-x-1'
                                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                        />
                    </Switch>

                    <br />
                    <br />

                    <i>Powered by HeadlessUI</i>

                </div>

                <br />

                <hr className="border-transparent my-8" />

                <div className="max-w-2xl">

                    <i>In order to keep on this field running and maintaining. If you like this project,
                        please support my work. You can add pull request on GitHub. And I'm glad to see that happen!
                    </i>

                <p>Cloudflare233@yandex.com</p>

                </div>



            </div>

        </Layout>
    )
}