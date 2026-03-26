// ─── STEP 1: Fake data generator ────────────────────────────────────────────
// Pure function — no React involved here.
// Called once outside the component so the array is created only at module load,
// not on every render.

const FIRST_NAMES = ['Alice','Bob','Carol','David','Eva','Frank','Grace','Hank','Iris','Jack','Kara','Leo','Mia','Noah','Olivia','Paul','Quinn','Rita','Sam','Tara']
const LAST_NAMES  = ['Smith','Johnson','Williams','Brown','Jones','Garcia','Miller','Davis','Wilson','Moore','Taylor','Anderson','Thomas','Jackson','White','Harris','Martin']
const DEPARTMENTS = ['Engineering','Design','Marketing','Sales','HR','Finance','Legal','Support','Product','DevRel']
const STATUSES    = ['Active','Inactive','On Leave','Contractor']

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function randomSalary() {
  return Math.floor(Math.random() * 120_000) + 40_000
}

function randomDate() {
  const start = new Date(2015, 0, 1)
  const end   = new Date(2024, 11, 31)
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
    .toISOString().slice(0, 10)
}

// Generate N rows once — each row is a plain object
export function generateEmployees(count = 1200) {
  return Array.from({ length: count }, (_, i) => ({
    id:         i + 1,
    name:       `${pick(FIRST_NAMES)} ${pick(LAST_NAMES)}`,
    department: pick(DEPARTMENTS),
    status:     pick(STATUSES),
    salary:     randomSalary(),
    joined:     randomDate(),
  }))
}
