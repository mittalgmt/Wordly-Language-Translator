import React from "react";

import MainTemplateContainer from "../Shared/templates/MainTemplate/MainTemplateContainer";
import TextTranslator from "../components/TextTranslator";
import DocumentTranslator from "./DocumentTranslator";
import AudiotoText from "./AudiotoText"
import TexttoAudio from "./Texttoaudio";
import ImageTranslator from "./ImageTranslator";
import Register from "./Register";
import Login  from "./Login";
import Carousel from "./text";

const HomeContainer = () => {

  return (

    <MainTemplateContainer>

       {/* <CenterHome /> */}
   <Login />
   <Register />
   <Carousel />
   <TextTranslator /> 
   <DocumentTranslator />
   <AudiotoText />   
   <TexttoAudio />
   <ImageTranslator />
  
    </MainTemplateContainer>

  );

};



export default HomeContainer;