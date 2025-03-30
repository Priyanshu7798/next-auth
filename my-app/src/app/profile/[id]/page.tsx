export default function userprofile({params}:any) {
    return(
        <>
            <div className="flex flex-col justify-center items-center min-h-screen py-2">
                Profile Page

                <p className="text-4xl">Profile Page
                    <span className="bg-orange-500 rounded-lg p-2 ml-2 text-black">
                        {params.id}
                    </span>
                </p>
            </div>
        </>
    )
}