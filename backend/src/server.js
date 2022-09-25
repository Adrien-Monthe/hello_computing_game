import express from "express";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());

const geometricShapes = ["triangle", "rectangle", "square", "circle"];

const units = {
  centimeter: { unit: "cm" },
  decimeter: { unit: "dm" },
  meter: { unit: "m" },
  kilometer: { unit: "km" },
};

app.get("/api/shapes", (req, res) => res.send("Hello!"));

app.post("/api/:name/calc", (req, res) => {
  const geometricShape = req.params.name.toLowerCase();
  var messageStatus = 200;
  var message = "";
  var data = {
    perimeter: 0,
    area: 0,
  };

  switch (geometricShape) {
    case "triangle":
      const { a, b, c } = req.body;
      if (
        typeof a != "number" ||
        typeof b != "number" ||
        typeof c != "number"
      ) {
        messageStatus = 400;
        message =
          "To calculate the perimeter or area of a " +
          geometricShape +
          " we need the side lenghts a,b and c, which should be numbers! verify your data";
      } else if (a <= 0 || b <= 0 || c <= 0) {
        messageStatus = 400;
        message = "a, b and c must be positive numbers! verify your data";
      } else {
        let trianglePerimeter = a + b + c;
        let s = trianglePerimeter / 2;
        let triangleArea = Math.sqrt(s * ((s - a) * (s - b) * (s - c)));
        messageStatus = 200;
        data = { perimeter: trianglePerimeter, area: triangleArea };
      }
      break;
    case "rectangle":
    case "square":
      const { l, w } = req.body;
      if (typeof l != "number" || typeof w != "number") {
        messageStatus = 400;
        message =
          "To calculate the perimeter or area of a " +
          geometricShape +
          " we need the side lenghts l and w, which should be numbers! verify your data";
      } else if (l <= 0 || w <= 0) {
        messageStatus = 400;
        message = "l and w must be positive numbers! verify your data";
      } else {
        let rectanglePerimeter = (l + w) * 2;
        let rectangleArea = l * w;
        messageStatus = 200;
        data = { perimeter: rectanglePerimeter, area: rectangleArea };
      }
      break;
    case "circle":
      const { r } = req.body;
      if (typeof r != "number" ) {
        messageStatus = 400;
        message =
          "To calculate the perimeter or area of a " +
          geometricShape +
          " we need its radius, r, which should be a number! verify your data";
      } else if (r <= 0) {
        messageStatus = 400;
        message = "the radius r must be a positive number! verify your data";
      } else {
        let circlePerimeter = Math.PI * 2 * r;
        let circleArea = Math.PI * r * r;
        messageStatus = 200;
        data = { perimeter: circlePerimeter, area: circleArea };
      }
      break;
    default:
      messageStatus = 400;
      message =
        geometricShape +
        " is not recognized! use either triange, rectangle, cirle or square";
  }
  if (messageStatus == 200) {
    res.status(messageStatus).json(data);
  } else {
    res.status(messageStatus).send(message);
  }
});

app.listen(8000, () => console.log("Listening on port 8000"));
