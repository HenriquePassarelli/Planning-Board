import React from 'react';
import styled from 'styled-components';

const Header = (): JSX.Element => {
    return (<Container>

        <h1>Planning board</h1>
    </Container>)
}

export default Header

const Container = styled.div`
    width: 80vw;
    height: 10vh;
    margin-bottom: 30px;
`