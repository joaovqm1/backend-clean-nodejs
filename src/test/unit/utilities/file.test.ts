import sinon from 'sinon'
import fs from 'fs'

import { FileUtilitiesImpl } from '@/utilities'

afterEach(function() {
  sinon.restore()
})

describe('Utilities - File Manager', function() {
  const fileManager = new FileUtilitiesImpl()

  it('Should read file content', function() {
    sinon.stub(fs, 'readFileSync').withArgs('path', 'utf8').returns('test jest sugest')

    expect(fileManager.get('path')).toEqual('test jest sugest')
  })

  it('Should read a JSON file', function() {
    sinon.stub(fileManager, 'get').withArgs('path').returns('{"nome": "teste"}')

    expect(fileManager.getJSON('path')).toEqual({ nome: 'teste' })
  })

  it('Should not found a JSON file', function() {
    sinon.stub(fileManager, 'get').withArgs('notFile').returns('')

    expect(function() { fileManager.getJSON('notFile') }).toThrowError('Nenhum arquivo encontrado no caminho notFile')
  })

  it('Should find a file', function() {
    sinon.stub(fs, 'existsSync').withArgs('path').returns(true)

    expect(fileManager.exists('path')).toBe(true)
  })

  it('Should not be able to find a file', function() {
    sinon.stub(fs, 'existsSync').withArgs('notPath').returns(false)

    expect(fileManager.exists('notPath')).toBe(false)
  })

  it('Should create a new file', function() {
    sinon.stub(fs, 'writeFileSync').callsFake(function() {
      return 'new file content'
    }).withArgs('path', 'new file content')

    expect(fileManager.create('path', 'new file content')).toEqual('new file content')
  })

  it('Should read files from directory', function() {
    const filesDirent = new fs.Dirent()
    filesDirent.name = 'teste path'

    const filesFromDir = [filesDirent]

    sinon.stub(fs, 'readdirSync').withArgs('path', null).returns(filesFromDir)

    expect(fileManager.getFilesFromDir('path')).toEqual(filesFromDir)
  })

  it('Should remove file from directory', function() {
    sinon.stub(fs, 'existsSync').withArgs('path').returns(true)

    sinon.stub(fs, 'unlinkSync').withArgs('path')

    expect(fileManager.remove('path')).toBeUndefined()
  })
})
