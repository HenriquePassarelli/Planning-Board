import React, { useState } from 'react';
import styled from 'styled-components'

type Props = {
    onDragStart: any
    id: string
}


const Card = (props: Props): JSX.Element => {
    const [header, setHeader] = useState<string>('')
    const [textArea, setTextArea] = useState<string>('')
    function getScrollHeight(e: any) {
        console.log(e.target.scrollHeight)
        var savedValue = e.target.value
        e.target._baseScrollHeight = e.target.scrollHeight
        e.target.value = savedValue
    }

    function onExpandableTextareaInput(e: any) {
        var minRows = e.target.getAttribute('data-min-rows') | 0, rows;
        !e.target._baseScrollHeight && getScrollHeight(e)

        e.target.rows = minRows
        rows = Math.ceil((e.target.scrollHeight - e.target._baseScrollHeight) / 16)
        e.target.rows = minRows + rows
    }

    const keyDown = (e: any) => {
        if (e.key === 'Enter' || e.key === 'Backspace' || e.key === 'Delete') {
            onExpandableTextareaInput(e)
        }
    }

    return (
        <Container id={props.id} draggable="true" onDragStart={props.onDragStart}>
            <input placeholder="type the title" value={header} onChange={(e) => setHeader(e.target.value)} />

            <textarea name="content" value={textArea} data-min-rows="3" rows={3} autoFocus onKeyDown={keyDown} onChange={(e) => setTextArea(e.target.value)} placeholder="type here"></textarea>

        </Container>)
}

export default Card

const Container = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;

    max-width:100%;
    min-height:60px;

    border: 2px solid #272727;
    padding: 16px;

    h3{ 
        margin: 0;
        padding-bottom: 10px;
        margin-bottom: 5px;
    }

    textarea, input{  
        display: block;
        overflow: hidden;
        width:15rem;
        padding: 10px;
        font-size: 14px;
        border-radius: 6px;
        border: 0;
        background-color: transparent;
        color: rgb(235, 235, 235);

        &:focus{
            background-color: rgb(38 38 38);
            outline: none;
        }
    }

    input{ 
        text-align: center;
        font-size: 1rem;
        font-weight: bold;
    }

`