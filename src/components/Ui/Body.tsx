import React from 'react';
import styled from 'styled-components'
import Board from '../Board';
import Calendar from '../Calendar';

const Body = (): JSX.Element => {
    return (
        <Container>
            <Calendar />
            <Board />
        </Container>
    )
}

export default Body

const Container = styled.div`
    width: 80vw;
    height: 90vh;
` 