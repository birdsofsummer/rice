import React, { Component } from "react"
import ReactDOM from "react-dom"
import { observer } from "mobx-react"


import { 
    DerivationState,
    $mobx,
    FlowCancellationError,
    ObservableMap,
    ObservableSet,
    Reaction,
    _allowStateChanges,
    _allowStateChangesInsideComputed,
    _allowStateReadsEnd,
    _allowStateReadsStart,
    _endAction,
    _getAdministration,
    _getGlobalState,
    _interceptReads,
    _isComputingDerivation,
    _resetGlobalState,
    _startAction,
    action,
    autorun,
    comparer,
    computed,
    configure,
    createAtom,
    decorate,
    entries,
    extendObservable,
    flow,
    get,
    getAtom,
    getDebugName,
    getDependencyTree,
    getObserverTree,
    has,
    intercept,
    isAction,
    isArrayLike,
    isBoxedObservable,
    isComputed,
    isComputedProp,
    isFlowCancellationError,
    isObservable,
    isObservableArray,
    isObservableMap,
    isObservableObject,
    isObservableProp,
    isObservableSet,
    keys,
    observable,
    observe,
    onBecomeObserved,
    onBecomeUnobserved,
    onReactionError,
    reaction,
    remove,
    runInAction,
    set,
    spy,
    toJS,
    trace,
    transaction,
    untracked,
    values,
    when,
} from "mobx"


class Todo {
    id = Math.random()
    @observable title = ""
    @observable finished = false
}

decorate(Todo, {
    title: observable,
    finished: observable
}

)

class TodoList {
    @observable todos = []
    @computed
    get unfinishedTodoCount() {
        return this.todos.filter(todo => !todo.finished).length
    }
}

@observer
class TodoListView extends Component {
    render() {
        return (
            <div>
                <ul>
                    {this.props.todoList.todos.map(todo => (
                        <TodoView todo={todo} key={todo.id} />
                    ))}
                </ul>
                Tasks left: {this.props.todoList.unfinishedTodoCount}
            </div>
        )
    }
}

const TodoView = observer(({ todo }) => (
    <li>
        <input
            type="checkbox"
            checked={todo.finished}
            onClick={() => (todo.finished = !todo.finished)}
        />
        {todo.title}
    </li>
))


export default class Index extends Component {
    //ReactDOM.render(<TodoListView todoList={store} />, document.getElementById("mount"))

    super(...arguments);

    render () {
        const store = new TodoList()
        return (<TodoListView todoList={store} />)

    }

}
