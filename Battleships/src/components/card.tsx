import styled from "styled-components/native";

const CardContainer = styled.View`
    background-color: #fff;
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 20px;
`
const CardText = styled.Text`
    font-size: 16px;
    color: #333;
`

// @ts-ignore
const TextCard = ({text}) => {
    return (
        <CardContainer>
            <CardText>
                {text}
            </CardText>
        </CardContainer>
    );
};

export default TextCard;
