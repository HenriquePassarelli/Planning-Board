import { useEffect, useState, } from "react";
import styled from "styled-components";
import Card from "./Ui/Card";
import { AiOutlinePlus } from "react-icons/ai";

interface Events extends Event {
    dataTransfer?: any
    target: any
}

type Cards = {
    id: number
    header: string
    body: string
    status: number
};
const Board = (): JSX.Element => {
    const [toDoList, setToDoList] = useState<Cards[]>([]);

   /*  const handleColumn = (id: string, parentId: string) => {
        const cards = [...toDoList];
        const cards2 = [...toDoList2];
        const cards3 = [...toDoList3];
        const idx1 = cards.findIndex(card => card.id === +id);
        const idx2 = cards2.findIndex(card => card.id === +id);
        const idx3 = cards3.findIndex(card => card.id === +id);
        console.log('case')

        toDoList.forEach((item) => {
            switch (+parentId[1]) {
                case 1:
                    if (idx1 !== -1 || idx2 !== -1 || idx3 !== -1) {
                        if (idx2 !== -1 || idx3 !== -1) {
                            if (idx2 !== -1) {
                                cards2.splice(idx2, 1);
                                setToDoList2(cards2)

                            } else {
                                cards3.splice(idx3, 1);
                                setToDoList3(cards3)
                            }

                        }
                        cards[idx1] = { ...item, status: +parentId[1] }
                        setToDoList(cards)
                    }

                    break;
                case 2:
                    if (idx1 !== -1 || idx2 !== -1 || idx3 !== -1) {
                        if (idx2 !== -1 || idx3 !== -1) {
                            if (idx2 !== -1) {
                                cards2[idx2] = { ...item, status: +parentId[1] }
                                setToDoList2(cards2)
                                console.log('case2')

                            } else {
                                cards3.splice(idx3, 1);
                                setToDoList3(cards3)
                            }

                        }
                        cards2.splice(idx2, 1);
                        setToDoList(cards)
                    }
                    break
                case 3:
                    if (idx1 !== -1 || idx2 !== -1 || idx3 !== -1) {
                        if (idx2 !== -1 || idx3 !== -1) {
                            if (idx2 !== -1) {
                                cards3.splice(idx2, 1);
                                setToDoList2(cards2)

                            } else {
                                cards3[idx3] = { ...item, status: +parentId[1] }
                                setToDoList3(cards3)
                            }

                        }
                        cards.splice(idx2, 1);
                        setToDoList(cards)
                    }
                    break;

                default:
                    break;
            }

        })


    } */

    const drop = (e: any): void => {
        e.preventDefault()
        const childID = e.dataTransfer.getData("text")
        const child = document.getElementById(childID)
        child?.classList.remove('active')
        if (e.target.classList[0] !== "cards-container") return;
        e.target.appendChild(child);
    };

    const drag = (e: Events) => {
        e.dataTransfer.setData("text", e.target.id)
        e.target.classList.add('active')
    };

    const allowDrop = (e: any): void => {
        e.preventDefault();
        if (e.target.getAttribute("draggable") === "true")
            e.dataTransfer.dropEffect = "none"
        else e.dataTransfer.dropEffect = "all"
    };

    const addCard = (): void => {
        const cards = [...toDoList];
        const newCard = {
            id: cards.length,
            header: "",
            body: "",
            status: 1,
        };
        cards.push(newCard)
        setToDoList(cards)
    };

    const handleDelete = (id: number): void => {
        /* const cards = [...toDoList];
        const idx = cards.findIndex((item) => item.id === id);
        cards.splice(idx, 1);
        setToDoList(cards); */


        const child = document.getElementById(id.toString())
        child?.remove()
    };

    return (
        <Container>
            <BoardColum className="to-do">
                <section className="board-header">
                    <h3 className="title">To Do</h3>
                    <AiOutlinePlus className="plus" onClick={addCard} />
                </section>
                <section
                    id="drop1"
                    className="cards-container 1"
                    onDrop={drop}
                    onDragOver={allowDrop}
                >
                    {toDoList.map((card) => {

                        return (
                            <Card
                                key={card.id}
                                id={card.id}
                                onDragStart={drag}
                                handleDelete={handleDelete}
                            />
                        );
                    })}
                </section>
            </BoardColum>
            <BoardColum className="progress">
                <section className="board-header">
                    <h3>In Progress</h3>
                </section>
                <section
                    id="drop2"
                    className="cards-container 2"
                    onDrop={drop}
                    onDragOver={allowDrop}
                >
                </section>
            </BoardColum>
            <BoardColum className="done">
                <section className="board-header">
                    <h3>Done</h3>
                </section>
                <section
                    id="drop3"
                    className="cards-container 3"
                    onDrop={drop}
                    onDragOver={allowDrop}
                >
                </section>
            </BoardColum>
        </Container>
    );
};

export default Board;

const Container = styled.div`
  max-width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: row;
  min-width:1200px;
  overflow: hidden;
`;

const BoardColum = styled.section`
  min-height: 40vh;
  height: 100%;
  flex: 1;
  &.to-do,
  &.progress {
    border-right: 3px solid #272727;
  }

  .board-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 2rem;
    border-bottom: 2px solid #272727;
    padding-bottom: 5px;
    & > h3 {
      flex: 1;
    }
    & > .plus {
      margin-right: 0.7rem;
      cursor: pointer;
    }
  }

  .cards-container {
    display: flex;
    flex-direction: column;
    gap: 8px;
    min-height: 50vh;
    padding: 16px;
    padding-bottom: 60px;
  }
`;
