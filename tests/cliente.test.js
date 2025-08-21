jest.mock('@prisma/client', () => {
  const mPrisma = {
      $queryRawUnsafe: jest.fn()
  }

  return {
      PrismaClient: jest.fn(() => mPrisma)
  }
})

const { PrismaClient } = require('@prisma/client')
const { selectAllCliente } = require('../model/dao/cliente')

describe('Mock - selectAllCliente', () => {
  test('Deve retornar lista mockada de clientes', async () => {
      const clientesFalsos = [
          { id: 1, nome: 'João', email: 'joao@email.com', telefone: '12345678' },
          { id: 2, nome: 'Maria', email: 'maria@email.com', telefone: '87654321' }
      ]

      PrismaClient().$queryRawUnsafe.mockResolvedValue(clientesFalsos)

      const resultado = await selectAllCliente()

      expect(resultado).toEqual(clientesFalsos)
      expect(resultado.length).toBe(2)
  })
})
