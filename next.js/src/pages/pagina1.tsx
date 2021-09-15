import { GetServerSideProps } from "next";

const Pagina1Page = ({name}: {name: string}) => {
  return <div>Pagina1 - {name}</div>;
};

export default Pagina1Page;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    
    //banco de dados
    //api externa
    return {
        props: {
            name: 'Luiz Carlos'
        }
    }
};

//Node.js
//Create React App - Facebook - Client Side Render