import APP_CONFIG from '../../app.config';

export class Node implements d3.SimulationNodeDatum {
  // optional - defining optional implementation properties - required for relevant typing assistance
  index?: number;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number | null;
  fy?: number | null;

  id: string;
  linkCount: number = 0;
  name: String = '';

  constructor(id) {
    this.id = id;
  }

  normal = () => {
    return Math.sqrt(this.linkCount / APP_CONFIG.N);
  }

  get r() {
    return 50 * this.normal() + 10;
  }

  get fontSize() {
    return (30 * this.normal() + 10) + 'px';
  }

  get color() {
    if(this.id == '1' || this.id == '16' || this.id == '71' || this.id == '84' || this.id == '21' || this.id == '89') {
      return APP_CONFIG.SPECTRUM[5];
    }
    // let index = Math.floor(APP_CONFIG.SPECTRUM.length * this.normal());
    return APP_CONFIG.SPECTRUM[6];
  }
}