import React from "react";
import Matter from "matter-js";

const PhysicsScene = () => {
  // engenharia da física, renderizador e executor
  const Engine = Matter.Engine;
  const Render = Matter.Render;
  const Runner = Matter.Runner;
  const Bodies = Matter.Bodies;
  const Mouse = Matter.Mouse;
  const MouseConstraint = Matter.MouseConstraint;
  // mundo
  const Composite = Matter.Composite;

  //criando engenharia
  const engine = Engine.create();
  // criando renderizador
  const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
      width: 800,
      height: 600,
      wireframes: false,
    },
  });
  console.log("renderizador criado");

  // MOUSE
  const mouse = Mouse.create(render.canvas);
  const mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      stiffness: 0.2,
      render: {
        visible: false,
      },
    },
  });

  // guia mousemove
  window.addEventListener('mousemove', (e) => {
    let posX = e.clientX;
    let posY = e.clientY;   
  })

  // FUNÇÕES
  /* POSIÇÃO ALETÓRIA  */
  const getPosition = () => {
    const randomPosX = Math.floor(Math.random() * 800);
    const randomPosY = Math.floor(Math.random() * 600);
    return { x: randomPosX, y: randomPosY };
  };

  /* GERAR CORES */
  const getCores = () => {
    const randomCor = Math.floor(Math.random() * 16777215).toString(16);
    return `#${randomCor}`; // adiciona o # para que o número gerado seja aceito pelo CSS
  };

  // paredes
  const piso = Bodies.rectangle(400, 620, 810, 50, { isStatic: true });
  const topo = Bodies.rectangle(400, 10, 810, 20, { isStatic: true });
  const parEsq = Bodies.rectangle(5, 400, 15, 760, { isStatic: true });
  const parDir = Bodies.rectangle(795, 400, 15, 760, { isStatic: true });

  // CÍRCULOS
  const circles = [];
  for (let i = 0; i < 150; i++) {
    const position = getPosition();
    const circle = Bodies.circle(position.x, position.y, 15, {
      isStatic: false,
      restitution: 0.7,
      friction: 0.1,
      render: {
        fillStyle: getCores(),
      },
    });
    circles.push(circle);
  }

  // adicionar elementos ao mundo
  Composite.add(
    engine.world,
    [...circles, piso, topo, parEsq, parDir, mouseConstraint],
    mouseConstraint
  );

  // executando renderizador
  Render.run(render);

  // criando e executanto a física
  const runner = Runner.create();
  Runner.run(runner, engine);

};

export default PhysicsScene;
