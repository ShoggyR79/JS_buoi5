var outputFormatted = new Intl.NumberFormat("vn-VN");

function passOrFail(event) {
  event.preventDefault();

  var pass = "Rớt";
  var minScore = parseInt(document.getElementById("minScore").value);

  var testerScoreA = parseInt(document.getElementById("testerScoreA").value);
  var testerScoreB = parseInt(document.getElementById("testerScoreB").value);
  var testerScoreC = parseInt(document.getElementById("testerScoreC").value);

  var regionBonus = document.getElementById("locationBonus").value;
  var personalBonus = document.getElementById("testerBonus").value;

  var total =
    testerScoreA +
    testerScoreB +
    testerScoreC +
    findBonus(regionBonus, personalBonus);

  if (total > minScore) {
    pass = "Đậu";
  }

  document.getElementById("footerPassFail").className = "card-footer d-block";
  document.getElementById("passFailOutput").innerHTML = pass;
}

function findBonus(reg, per) {
  var regionBonus = 0;
  var personalBonus = 0;
  switch (reg) {
    case "A":
      regionBonus = 2;
      break;
    case "B":
      regionBonus = 1;
      break;
    case "C":
      regionBonus = 0.5;
      break;
  }
  switch (parseInt(per)) {
    case 1:
      personalBonus = 2.5;
      break;
    case 2:
      personalBonus = 1.5;
      break;
    case 3:
      personalBonus = 1;
      break;
  }
  return regionBonus + personalBonus;
}

function powerBill(event) {
  event.preventDefault();

  var name = document.getElementById("userName").value;
  var usage = parseInt(document.getElementById("powerUsage").value);

  var total = first50(usage) + next50(usage) + next100(usage) + next150(usage) + rest(usage);

  var output = name + "- tổng số tiền thu là:  " + outputFormatted.format(total);

  document.getElementById("footerPower").className = "card-footer d-block";
  document.getElementById("powerOutput").innerHTML = output + " vnd";
}

function first50(u) {
  if (u < 50) {
    return u * 500;
  }
  else {
    return 50 * 500;
  }
}
function next50(u) {
  if (u <= 50) {
    return 0;
  } else if (u > 50 && u < 100) {
    return (u - 50) * 650;
  } else {
    return 50 * 650;
  }
}

function next100(u) {
  if (u <= 100) {
    return 0;
  } else if (u > 100 && u < 200) {
    return (u - 100) * 650;
  } else {
    return 100 * 650;
  }
}

function next150(u) {
  if (u <= 200) {
    return 0;
  } else if (u > 200 && u < 350) {
    return (u - 200) * 1100;
  } else {
    return 150 * 650;
  }
}

function rest(u) {
  if (u < 350) {
    return 0;
  } else {
    return (u - 350) * 1300;
  }
}


function cableCalc(event) {
  event.preventDefault();
  var customerType = '';
  var houseHold = document.getElementById("household").checked;
  var business = document.getElementById("business").checked;

  var accountNum = document.getElementById("stk").value;

  if (houseHold) {
    customerType = "h";
  } else if (business) {
    customerType = "b";
  }

  var basic = parseInt(document.getElementById("basicLink").value);
  var adv = parseInt(document.getElementById("advancedLink").value);

  var price = cablePrice(basic, adv, customerType);

  document.getElementById("footerCable").className = "card-footer d-block";
  document.getElementById("stkOutput").innerHTML = accountNum;
  document.getElementById("moneyOutput").innerHTML = "$" + price;


}

function cablePrice(bas, adv, cus) {
  if (cus == "h") {
    return (4.5 + 20.5 + (7.5 * adv));
  } else if (cus == "b") {
    return (15 + busiCable(bas) + (50 * adv));
  } else {
    return "INVALID customer"
  }
}

function busiCable(num) {
  if (num <= 10) {
    return 75;
  } else {
    return 75 + ((num - 10) * 5);
  }
}