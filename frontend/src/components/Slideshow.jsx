import React, { Component } from "react";
import { Slide } from "react-slideshow-image";
import "../assets/slideshow-styles.css";
import "react-slideshow-image/dist/styles.css";


class slideshow extends Component {
    constructor() {
        super();
        this.slideRef = React.createRef();
        this.back = this.back.bind(this);
        this.next = this.next.bind(this);
        this.state = {
            current: 0
        };
    }

    back() {
        this.slideRef.current.goBack();
    }

    next() {
        this.slideRef.current.goNext();
    }

    render() {
        const properties = {
            duration: 4000,
            autoplay: true,
            transitionDuration: 500,
            arrows: false,
            infinite: true,
            easing: "ease",
            // indicators: (i) => <div className="indicator">{i + 1}</div>
        };

        const slideImages = [
            "https://i.ibb.co/PGqwG4m/1.jpg",
            "https://i.ibb.co/gMTCVnD/2.jpg",
            "https://i.ibb.co/kJ37nVB/3.jpg",
            "https://i.ibb.co/zH0fY0X/4.jpg",
            "https://i.ibb.co/PTjzKTm/6.jpg",

        ];
        return (
            <div className="slideshow">
                <h3
                    fontFamily="Poppins"
                    textAlign="center"
                    fontWeight="900"
                    fontSize="2rem"
                    marginBottom="-5rem"
                    paddingTop="1rem"
                    color="blue"
                    maxWidth="90%"
                    marginLeft="auto"
                    marginRight="auto"
                >
                    Dive into the world of fashion</h3>
                <div className="slide-container">
                    <Slide ref={this.slideRef} {...properties}>
                        {slideImages.map((each, index) => (
                            <div key={index} className="each-slide">
                                <img className="lazy" src={each} alt="sample" />
                            </div>
                        ))}
                    </Slide>
                </div>

                {/* <div className="slide-container buttons">
                    <button onClick={this.back} type="button">
                        Go Back
                    </button>
                    <button onClick={this.next} type="button">
                        Go Next
                    </button>
                </div> */}
            </div>
        );
    }
}

export default slideshow;
