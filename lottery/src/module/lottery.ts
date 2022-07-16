import { NormalPerson, Winner } from "./interface";


/**
 * @description 抽奖
 */
export class Lottery {
  private laterPerson: NormalPerson[];
  private splitPerson:SplitPerson;
  private randomWinner:Winner;

  constructor(
    private totalPerson: NormalPerson[],
    private topTenPerson: NormalPerson[]
  ) {
    this.splitPerson = new SplitPerson(this.totalPerson, this.topTenPerson);
    this.randomWinner = new RandomWinner();
    this.laterPerson = this.splitPerson.laterPerson;
  }
  /**
   * 是否还有前十个未抽奖人群
   */
  private get hasTopTenPerson() {
    return this.topTenPerson.length >= 1;
  } 
  /**
   * 是否还有没抽奖的人群
   */
  private get hasLasterPerson() {
    return this.laterPerson.length >= 1;
  } 

  /**
   * 
   * @param pickedPerson 已抽取的人群
   * @description 将抽中的人从总人数中剔除
   */
  private decreaseById(pickedPerson: NormalPerson) {
    const filterFn = (person: NormalPerson) => {
      return person.id !== pickedPerson.id;
    };
    if (this.hasLasterPerson) {
      if (this.hasTopTenPerson) {
        this.topTenPerson = this.topTenPerson.filter(filterFn);
      } else {
        this.laterPerson = this.laterPerson.filter(filterFn);
      }
    }
  }
  /**
   *
   * @returns 选出中奖人
   * @description 选出中奖人并且将选中的踢出
   */
  pick() {
    let pickPerson: NormalPerson;
    if (this.hasLasterPerson) {
      if (this.hasTopTenPerson) {
        pickPerson = this.randomWinner.pickOne(this.topTenPerson);
      } else {
        pickPerson = this.randomWinner.pickOne(this.laterPerson);
      }
      this.decreaseById(pickPerson);
      return pickPerson;
    }
    throw new Error('抽奖完毕');
  }
}
/**
 * @description 从randomWinners 随机选取
 */
class RandomWinner implements Winner{
  pickOne(randomWinners: NormalPerson[]): NormalPerson {
    return randomWinners[
      Math.floor(Math.random() *randomWinners.length)
    ];
  }
}
/**
 * @description 将参加的人群进行分组
 */
class SplitPerson {
  constructor(
    private totalPerson: NormalPerson[],
    private topTenPerson: NormalPerson[]
  ) {}

  /**
   * @description 后置参加抽奖的人
   */
  get laterPerson() {
    const topTenPersonIds = this.topTenPerson.map((person) => person.id);
    return this.totalPerson.filter((person) => {
      return !topTenPersonIds.includes(person.id);
    });
  }
}
