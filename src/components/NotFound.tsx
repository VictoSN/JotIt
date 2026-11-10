import emptyIcon from "../assets/empty.svg";

function NotFound() {
    return (
        <div className="bg-div flex flex-col gap-4 w-full items-center justify-center p-8 rounded-lg bg-[#222222] hover:bg-[#242424] border-0">
            <img src={emptyIcon} alt="Empty" className="w-[24%] md:w-[12%] bg-[#191919] rounded-full"/>
            <p className="text-[#9a9a9a] text-sm">Add your first application, or adjust your search to see more.</p>
        </div>
    )
}

export default NotFound