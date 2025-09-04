
import SubtemaPage from '../components/SubtemaPage';
import BackButton from '../components/BackButton';
import SubtemaList from "../components/SubtemaList";
export default function SubtemaAdm() {


    return(
        <div className="fixed w-full min-h-screen bg-gradient-to-r from-teal-50 to-emerald-50
        ">

            <h1 className="p-6 bg-gradient-to-r from-green-500 to-green-700 m-4 rounded-xl font-bold
            text-white text-xl bg-fixed"> Sistema de gerenciamento de subtemas </h1>

            <SubtemaList></SubtemaList>

            <SubtemaPage></SubtemaPage>

            <BackButton></BackButton>
        </div>

    )
}