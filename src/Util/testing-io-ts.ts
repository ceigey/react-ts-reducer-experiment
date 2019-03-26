import * as t from 'io-ts'

interface UserDef {
  userId: number,
  something1: number,
  something2: number,
  something3: number,
  name: string,
  address: {
    street: string,
    suburb: string
  }
}

const User = t.type({
  userId: t.number,
  name: t.string,
  address: t.type({
    street: t.string,
    suburb: t.string
  })
})

const user = {
  userId: 1,
  name: 'Bob',
  address: {
    street: 'First St',
    suburb: 'Nyork'
  }
}

console.log(User.is(user))

console.log(User.is(user))

const userPasser = (user: UserDef) => {
  console.log("It worked!" + user.something2)
  return user
}

User.decode(user).map(userPasser)

User.decode(user).filterOrElse(User.is, null)

// User.decode(user).