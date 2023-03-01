import { useAsyncCallback } from './useAsyncCallback'
import { ErrorBoundary } from 'react-error-boundary'

let performTasks 
const performTaskOne = jest.fn()
const performTaskTwo = jest.fn()

const Component = () => {
    const performTasks = useAsyncCallback(async () => {
        await performTaskOne()
        await performTaskTwo()
    })
    return <button onClick={performTasks}>Perform tasks</button>
}

it('throws errors to React error boudnary', () => {
    const { container } = render(<ErrorBoundary fallbackRender={({error})=>error}><Component /><ErrorBoundary>)
    performTaskTwo.mockImplementation(() => {
      throw new Error('Example error')
    })
    result.current.performTasks()
    expect(container.textContent).toBe('')
})