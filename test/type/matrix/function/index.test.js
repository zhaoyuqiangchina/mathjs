// test index construction
const assert = require('assert')
const math = require('../../../../src/main')
const Range = math.type.Range
const ImmutableDenseMatrix = math.type.ImmutableDenseMatrix

describe('index', function () {
  it('should create an index', function () {
    const index = math.index(new Range(2, 6))
    assert.ok(index instanceof math.type.Index)
    assert.deepEqual(index._dimensions, [{start: 2, end: 6, step: 1}])

    const index2 = math.index(new Range(0, 4), new Range(5, 2, -1))
    assert.ok(index2 instanceof math.type.Index)
    assert.deepEqual(index2._dimensions, [{start: 0, end: 4, step: 1}, {start: 5, end: 2, step: -1}])
  })

  it('should create an index from bignumbers (downgrades to numbers)', function () {
    const index = math.index(new Range(math.bignumber(2), math.bignumber(6)), math.bignumber(3))
    assert.ok(index instanceof math.type.Index)
    assert.deepEqual(index._dimensions, [new Range(2, 6, 1), new ImmutableDenseMatrix([3])])
  })

  it('should LaTeX index', function () {
    const expr1 = math.parse('index(1)')
    const expr2 = math.parse('index(1,2)')
    const expr3 = math.parse('index(1,2,3)')

    assert.equal(expr1.toTex(), '\\mathrm{index}\\left(1\\right)')
    assert.equal(expr2.toTex(), '\\mathrm{index}\\left(1,2\\right)')
    assert.equal(expr3.toTex(), '\\mathrm{index}\\left(1,2,3\\right)')
  })
})
