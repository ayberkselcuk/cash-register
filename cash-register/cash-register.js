//First of all I created a object currency unit and at the end I'will convert it to penny.
const currencyUnit = {
    "PENNY": 1,
    "NICKEL": 5,
    "DIME": 10,
    "QUARTER": 25,
    "FIVE": 500,
    "TEN": 1000,
    "TWENTY": 2000,
    "ONE HUNDRED": 10000
}
function checkCashRegister(price, cash, cid) {

    //first I calculated the difference between the cash that I receive and the price of the product so I know what change I need to return and as I said at first,I multiply everything by 100 so we have only integerrs and we can work only with integers.
    let changeSum = cash * 100 - price * 100;
    let changeSumCheck = changeSum; //right here I've just copied the value of changeSum because I need to store this changeSum.
    let change = []; //I initiate change which will be in 2darray.It's an empty array and the status is empty string.
    let status = '';

    let cidSum = 0;//I initiate value for cidSum so I want to calculate and store in this variable the sum of all the money in the register.
    let filteredCid = cid.filter(elem => elem[1] !== 0).reverse();//I am filtering the cash in drawer the CID array because when you get the CID you get also some currency denominations with a value of 0 so we have 0 nickel 0 quarter so I don't want to check them because they have no value.I'm just getting an array of cashing drawer but I am removing the denominations that have zero.Then I am reversing them because when a person enter the cid usually starting from the lowest.

    //I want to calculate if I have enough money to give the change right below.
    filteredCid.forEach(elem => { //I did forEach to iterate through all the filtered CID now the element here which will store an array like ["penny",1.01] it will store the currency domination and the value we have at the cash register
        let curr = elem[0];//first element is currency.
        let currSum = elem[1] * 100; //second one is value.I multiplied with 100 because I want to work with whole numbers.
        cidSum += currSum;
        let amount = 0;

        //In while loop I am doing ; I am checking if changeSum is still larger or equal to currencyUnit(First object).When I am at the first iteration I am checking if I have to return a change sum which is larger than or equal to let's say 100 dollars and I am also checking the currencySum if I had cursed sum is Measuring how much I have of that denomination in the register if I still because if I don't have any left in the register  we cannot give it as change.So I need these two conditions to be true for the loop.
        while (changeSum >= currencyUnit[curr] && currSum > 0) {
            amount += currencyUnit[curr];
            changeSum -= currencyUnit[curr];
            currSum -= currencyUnit[curr];
        }
        if (amount !== 0) {
            change.push([curr, amount / 100]);
        }
    });
    if (changeSum > 0) {
        status = 'INSUFFICIENT_FUNDS';
        change = [];
    } else if (changeSum == 0 && changeSumCheck == cidSum) {
        status = 'CLOSED';
        change = cid;
    } else {
        status = 'OPEN';
    }
    return { 'status': status, 'change': change };
}
console.log(checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])); ca