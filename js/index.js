const e = React.createElement;
const root = document.querySelector('#root');

class FormItem extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const obj = {};
        obj[e.target.name] = e.target.value;
        obj.id = this.props.id;
        this.props.onChange(obj);
    }

    render() {
        return (
            <div className="form-item">
                <span className="name">{this.props.name}</span>
                <div className="line">
                    <label>公共物品价格:</label>
                    <input type="number" name="publicValue" value={this.props.publicValue} onChange={this.handleChange} min="0" />
                </div>
                <div className="line">
                    <label>帮带物品价格:</label>
                    <input type="number" name="helpValue" value={this.props.helpValue} onChange={this.handleChange} min="0" />
                </div>
            </div>
        );
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [{
                id: 0,
                name: '罗昊',
                publicValue: 0,
                helpValue: 0
            }, {
                id: 1,
                name: '唐之胜',
                publicValue: 0,
                helpValue: 0
            }],
            result: '不用给钱'
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        let result = '';
        const arr = this.state.list.map(item => {
            if (item.id === e.id) {
                item = Object.assign(item, e)
            }
            return item;
        })
        //按publicValue从大到小排序后的数组
        const sortArr = [...arr].sort((a, b) => b.publicValue - a.publicValue);

        if (arr[0].publicValue - arr[1].publicValue === 0 && arr[0].helpValue - arr[1].helpValue === 0) {
            result = '不用给钱';
        } else {
            result = sortArr[1].name + '给' + sortArr[0].name + (((sortArr[0].publicValue - sortArr[1].publicValue) / 2) + (sortArr[0].helpValue - sortArr[1].helpValue)).toFixed(2) + '块钱';
        }

        this.setState({
            list: arr,
            result: result
        });
    }

    render() {
        return (
            <div className="context">
                {this.state.list.map(item => <FormItem name={item.name} publicValue={item.publicValue} helpValue={item.helpValue} onChange={this.handleChange} id={item.id} />)}
                <p className="result">{this.state.result}</p>
            </div>
        );
    }
}

ReactDOM.render(<App />, root);