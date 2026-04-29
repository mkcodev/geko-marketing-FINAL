import CardSwap, { Card } from './CardSwap'

export const CardSwapper = () => {
  return (

    <div style={{ height: '600px', position: 'relative' }}>
      <CardSwap
        cardDistance={80}
        verticalDistance={115}
        delay={3000}
        pauseOnHover
      >
        <Card>
          <h3>Card 1</h3>
          <p>Your content here</p>
        </Card>
        <Card>
          <h3>Card 2</h3>
          <p>Your content here</p>
        </Card>
        <Card>
          <h3>Card 3</h3>
          <p>Your content here</p>
        </Card>
      </CardSwap>
    </div>
  );
};
