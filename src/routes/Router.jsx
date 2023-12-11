import { Routes  , Route } from "react-router";
import HomePage from '../pages/HomePage'
import LibraryPage from '../pages/LibraryPage'
import ProfilePage from '../pages/ProfilePage'
import HistoryPage from '../pages/HistoryPage'
import FavoritePage from '../pages/FavoritePage'
import ComicPage from "../pages/ComicPage";
import ChapterPage from "../pages/ChapterPage";
import SettingPage from '../pages/profile/SettingPage';

export default function Router(){
    return (
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/library" element={<LibraryPage/>}/>
            <Route path="/favorite" element={<FavoritePage/>}/>
            <Route path="/history" element={<HistoryPage/>}/>
            <Route path="/profile" element={<ProfilePage/>}/>
            <Route path="/series/:url" element={<ComicPage/>}/>
            <Route path="/ch/:chapter" element={<ChapterPage/>}/>
            <Route path="/profile/settings" element={<SettingPage/>} />
        </Routes>
    )
}
