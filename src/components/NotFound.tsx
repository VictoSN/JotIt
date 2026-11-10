import emptyIcon from "../assets/empty.svg";

function NotFound() {
    return (
        <div className="bg-div flex w-full items-center justify-center p-4 rounded-lg bg-[#222222] hover:bg-[#242424] border-0">
            <img src={emptyIcon} alt="Empty" className="w-[300px] h-[300px]"/>
        </div>
    )
}

export default NotFound