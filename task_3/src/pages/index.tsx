import axios, { AxiosResponse } from 'axios';
import { NextPage, GetServerSideProps } from 'next';
import { HeaderComponent, ListOfNotesComponent } from '../components';
import { AppView } from '../views/app';
import { INoteModel } from '../types';



interface IProps {
    notes: INoteModel[];
}


const Home:NextPage<IProps> = ({ notes }) => {

    return (
        <AppView
            header = { <HeaderComponent /> }
            content = { <ListOfNotesComponent /> }
        />
    )
};

export const getServerSideProps:GetServerSideProps = async (context) => {
    try {
        const newNota =  {
                title:       "Add new note Feature",
                category:    "Idea",
                description: "Clearly define the problem that you want to solve 06/10/2022",
                archived:    false,

            };
        const res = await axios.post(`http://${context?.req?.headers?.host}/api/notes/`, newNota);
        console.log(res?.data)
        return {
            props: {
                notes: new Array<INoteModel>(),
            }
        }
    }catch (err){
        console.log(err)
        return {
            props: {
                notes: new Array<INoteModel>(),
            }
        }
    }


};

export default Home;
