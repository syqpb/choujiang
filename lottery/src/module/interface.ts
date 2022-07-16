/**
 * 候选人
 */
export interface NormalPerson {
    id:string|number;
    name:string;
}


/**
 * 选取中奖用户方法
 */
export interface Winner {
    pickOne(randomWinners: NormalPerson[]):NormalPerson;
}
