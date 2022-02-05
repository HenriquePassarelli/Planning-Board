
import styled from 'styled-components';

const Header = (): JSX.Element => {
    return (
        <Container>
            <h1>Planning board</h1>
        </Container>)
}

export default Header

const Container = styled.div`
    width: 100%;
    height: 80px;
    margin-bottom: 30px;
`