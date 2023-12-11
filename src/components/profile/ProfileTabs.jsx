export default function ProfileTabs({tab}){
    switch (tab) {
        case 1:
            return (
                <div className="w-full h-full flex items-center justify-center">
                    Story
                </div>
            )
            break;
        case 2:
            return (
                <div className="w-full h-full flex items-center justify-center">
                    Bookmark
                </div>
            )
            break;

        default:
            return (
                <div className="w-full h-full flex items-center justify-center">
                    Downloads
                </div>
            )
            break;
    }
}