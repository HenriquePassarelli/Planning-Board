import React, { useState } from 'react';
import styled from 'styled-components'
import Card from './Ui/Card';

interface Events extends Event {
    dataTransfer?: any
    target: any
}

type Cards = {
    id: number
    header: string
    body: string
    status: number
}


const Board = (): JSX.Element => {

    const [toDoList, setToDoList] = useState<Cards[]>([])

    const drop = (e: any): void => {
        e.preventDefault();
        var data = e.dataTransfer.getData("text");
        e.target.appendChild(document.getElementById(data));
        console.log(data)
    }
    const drag = (e: Events) => {
        e.dataTransfer.setData("text", e.target.id);
        console.log(e.dataTransfer)
    }

    const allowDrop = (e: { preventDefault: () => void; }): void => {
        e.preventDefault()
    }

    const addCard = (): void => {
        const cards = [...toDoList]
        const newCard = {
            id: cards.length,
            header: '',
            body: '',
            status: 1
        }
        cards.push(newCard)
        setToDoList(cards)
    }

    return (
        <Container>
            <BoardColum className="to-do">
                <section className="board-header">
                    <h3 className="title">To Do</h3>
                    <i className="fas fa-plus plus" onClick={addCard} />
                </section>
                <section id='01' className="cards-container" onDrop={drop} onDragOver={allowDrop}>
                    {toDoList.map((card) => {
                        return (
                            <Card id={card.id.toString()} onDragStart={drag} />
                        )
                    })}
                </section>
            </BoardColum>
            <BoardColum className="progress">
                <section className="board-header">
                    <h3>In Progress</h3>
                </section>
                <section id='02' className="cards-container" onDrop={drop} onDragOver={allowDrop}>

                </section>
            </BoardColum>
            <BoardColum className="done">
                <section className="board-header">
                    <h3>Done</h3>
                </section>
                <section id='03' className="cards-container" onDrop={drop} onDragOver={allowDrop}>

                </section>
            </BoardColum>
        </Container>
    )
}

export default Board

const Container = styled.div`
    width:80vw;
    height: fit-content;
    display:flex;
    flex-direction:row;
`

const BoardColum = styled.section` 
    min-height:40vh;
    height: fit-content;
    flex:1;
    &.to-do,&.progress{
        border-right: 3px solid #272727;

    }

    .board-header  {
        display:flex;
        flex-direction:row;
        align-items:center;
        justify-content:center;        
        height:2rem;
        border-bottom: 2px solid #272727;
        padding-bottom: 5px;
        & > h3{
            flex:1;
        }
        & > .plus {
            margin-right:.7rem;
            cursor:pointer;
        }
    }

    .cards-container{
        display:flex;
        flex-direction:column;
        gap:8px;
        min-height: 50vh;
        padding: 16px;
        padding-bottom: 60px;
    }
`