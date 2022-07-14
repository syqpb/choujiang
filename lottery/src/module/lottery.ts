import { NormalPerson } from "./interface";
/**
 * @description 抽奖
 */
export class Lottery {
  private laterPerson: NormalPerson[];

  constructor(
    private totalPerson: NormalPerson[],
    private topTenPerson: NormalPerson[]
  ) {
    this.laterPerson = this.getLasterPerson();
  }
  /**
   * 
   * @returns NormalPerson[]
   * @description 得到 后续获奖人群
   */
  private getLasterPerson() {
    return new SplitPerson(this.totalPerson, this.topTenPerson).laterPerson;
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
        pickPerson = new RandomWinner(this.topTenPerson).pickOne();
      } else {
        pickPerson = new RandomWinner(this.laterPerson).pickOne();
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
class RandomWinner {
  constructor(private randomWinners: NormalPerson[]) {}
  pickOne(): NormalPerson {
    return this.randomWinners[
      Math.floor(Math.random() * this.randomWinners.length)
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
