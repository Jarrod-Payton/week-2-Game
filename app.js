let Days =
  [{ name: 'Monday' },
  { name: 'Tuesday' },
  { name: 'Wednesday' },
  { name: 'Thursday' },
  { name: 'Friday' },
  { name: 'Saturday' },
  { name: 'Sunday' }]

let Upgrades =
  [{ name: 'VendingMachine', Price: 150, Value: 75, RestockCost: 50, Quantity: 0 },
  { name: 'ATM', Price: 300, Value: 125, RestockCost: 75, Quantity: 0 },
  { name: 'IndexFund', Price: 450, Value: 75, RestockCost: 0, Quantity: 0 },
  { name: 'House', Price: 2000, Value: 300, RestockCost: 0, Quantity: 0 },
  { name: 'Bussiness', Price: 10000, Value: 1000, RestockCost: 300, Quantity: 0 }
  ]

let Money = 1000
let Modifier = 1
let Day = 0
let TotalDays = 1
let Employees = 0
let EmployeeCost = 300
let EquipmentCost = 100
let EquipmentsBought = 0
let EmployeeMoney = 0

Update()

function Time() {
  let collection = setInterval(NewDay, 6000)
}

function EmployeeTimer() {
  let labor = setInterval(EmployeeClick, 1000)
}

function EmployeeClick() {
  console.log('hi')
  let Helpful = Employees * Modifier
  Money += Helpful
  EmployeeMoney += Helpful
  Update()
}

function NewDay() {
  Day++
  TotalDays++
  if (Day == 7) {
    Day = 0
  }
  if (Day == 6) {
    Upgrades.forEach(u => { if (u.Quantity >= 1) { Money -= u.RestockCost * u.Quantity } })
    Upgrades.forEach(u => { if (u.Quantity >= 1) { Money += u.Value * u.Quantity } })
  }
  Update()
}

function MoneyClick() {
  Money += Modifier
  Update()
}

function BuyEquipment() {
  if (Money >= EquipmentCost) {
    EquipmentsBought++
    Money -= EquipmentCost
    Modifier += 10
    EquipmentCost += Math.floor(EquipmentCost / 3)
  } else {
    window.alert(`You Need ${EquipmentCost - Money} Dollars More to Buy Equipment`)
  }
  Update()
}

function BuyEmployee() {
  if (Money >= EmployeeCost) {
    Employees++
    Money -= EmployeeCost
    EmployeeCost += Math.floor(EmployeeCost / 3)
    EmployeeTimer()
  } else if (Employees >= 1) {
    window.alert(`You Need $${EmployeeCost - Money} To Buy Another Employee`)
  } else {
    window.alert(`You Need $${EmployeeCost - Money} To Buy A Employee`)
  }
  Update()
}


function Purchased(number) {
  if (Money >= Upgrades[number].Price) {
    Money -= Upgrades[number].Price
    Upgrades[number].Price += PriceIncreaser(number)
    Upgrades[number].Quantity++
  } else {
    window.alert(`You need ${Upgrades[number].Price - Money} More Dollars To Buy This`)
  }
  Update()
}

function PriceIncreaser(number) {
  let NewPrice = Math.floor(Math.random() * Upgrades[number].Price)
  return NewPrice
}

function Update() {
  document.getElementById('MoneyScreen').innerText = `Money: $${Money}`
  document.getElementById('VendingButton').innerText = `Buy a Vending Machine: $${Upgrades[0].Price}`
  document.getElementById('ATMButton').innerText = `Buy an ATM: $${Upgrades[1].Price}`
  document.getElementById('IndexFundButton').innerText = `Buy An Index Fund: $${Upgrades[2].Price}`
  document.getElementById('HouseButton').innerText = `Buy a House: $${Upgrades[3].Price}`
  document.getElementById('BussinessButton').innerText = `Buy a Bussiness That's for sale: $${Upgrades[4].Price}`
  document.getElementById('DayCount').innerText = `${Days[Day].name}, Days(total): ${TotalDays}`
  document.getElementById('Assets-Vending-Machines').innerText = `Vending Machines: ${Upgrades[0].Quantity}`
  document.getElementById('Assets-ATMS').innerText = `ATMS: ${Upgrades[1].Quantity}`
  document.getElementById('Assets-Index-Funds').innerText = `Index Funds: ${Upgrades[2].Quantity}`
  document.getElementById('Assets-Houses').innerText = `Houses: ${Upgrades[3].Quantity}`
  document.getElementById('Assets-Bussinesses').innerText = `Bussinesses: ${Upgrades[4].Quantity}`
  document.getElementById('Assets-Employees').innerText = `Employees: ${Employees}`
  document.getElementById('EmployeeButton').innerText = `Buy a Employee (you'll still be paying of course, ths isn't slavery): $${EmployeeCost}`
  document.getElementById('EmployeeEarnings').innerText = `Your Employees Alone Have Made You: $${EmployeeMoney}`
  document.getElementById('Assets-Equipment').innerText = `Equipment: ${EquipmentsBought}`
  document.getElementById('EquipmentButton').innerText = `Buy Equipment: $${EquipmentCost}`
}

Time()