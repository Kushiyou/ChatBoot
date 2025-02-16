import React from 'react';
import classes from './Home.module.css';
import Main from "../component/UI/Main/Main";

const Home = () => {
    return (
        <div className={classes.Home}>
            {/*<Header>头部导航</Header>*/}
            <Main></Main>
        </div>
    );
};

export default Home;