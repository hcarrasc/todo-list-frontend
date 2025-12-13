import Board from '../components/Board';
import Header from '../components/Header';
import Inbox from '../components/Inbox';

function Home() {
    return (
        <>
            <Header />
            <div className="main-wrapper">
                <Inbox />
                <Board />
            </div>
        </>
    );
}

export default Home;
