import React, { useState } from "react";
import styled from "styled-components";
import { BsTrashFill } from "react-icons/bs";

type Props = {
    onDragStart: any;
    id: number;
    handleDelete: (id: number) => void;
};

const Card = (props: Props): JSX.Element => {
    const [header, setHeader] = useState<string>("");
    const [textArea, setTextArea] = useState<string>("");

    function getScrollHeight(e: any) {
        var savedValue = e.target.value;
        e.target._baseScrollHeight = e.target.scrollHeight;
        e.target.value = savedValue;
    }

    function onExpandableTextareaInput(e: any) {
        var minRows = e.target.getAttribute("data-min-rows") | 0,
            rows;
        !e.target._baseScrollHeight && getScrollHeight(e);

        e.target.rows = minRows;
        rows = Math.ceil((e.target.scrollHeight - e.target._baseScrollHeight) / 16);
        e.target.rows = minRows + rows;
    }

    const keyDown = (e: any) => {
        if (e.key === "Enter" || e.key === "Backspace" || e.key === "Delete") {
            onExpandableTextareaInput(e);
        }
    };

    return (
        <Container
            id={props.id.toString()}
            draggable="true"
            onDragStart={props.onDragStart}
        >
            <CardHeader>
                <input
                    placeholder="type the title"
                    value={header}
                    onChange={(e) => setHeader(e.target.value)}
                />
                <BsTrashFill className="trash" onClick={() => props.handleDelete(props.id)} />
            </CardHeader>
            <textarea
                name="content"
                className="textarea"
                value={textArea}
                data-min-rows="3"
                rows={3}
                autoFocus
                onKeyDown={keyDown}
                onChange={(e) => setTextArea(e.target.value)}
                placeholder="type here"
            ></textarea>
        </Container>
    );
};

export default Card;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  max-width: 100%;
  min-height: 60px;

  border: 2px solid #272727;
  padding: 16px;

  &.active{
    border-color: #b4b4b4;
  }

  .textarea,
  input {
    display: block;
    overflow: hidden;
    width: 15rem;
    padding: 10px;
    font-size: 14px;
    border-radius: 6px;
    border: 0;
    background-color: transparent;
    color: rgb(235, 235, 235);

    &:focus {
      background-color: rgb(38, 38, 38);
      outline: none;
    }
  }

  
`;

const CardHeader = styled.section`
  width: 100%;  
  display: flex;
  flex-direction: row;
  align-items: center;
  input {
    width: 100%;
    text-align: center;
    font-size: 1rem;
    font-weight: bold;
  }
  .trash{
    font-size: 18px;
    margin-left: 15px;
      cursor: pointer;
  }
`;
