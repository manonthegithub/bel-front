import React from 'react'

export class ProductListForAdmin extends React.Component {

    componentWillMount() {
        $.ajax({
            url: this.props.url,
            data: {
                category: 'BOOKBOX',
                sort: 'createdAt'
            },
            cache: false,
            success: (response) => {
                this.props.onProductAction({type: 'SET_NEW_DATA', array: response});
            },
            error: (xhr, status, err) => {
                console.error(this.props.url, status, err.toString());
            }
        });
    }

    removeHandler(id) {
        $.ajax({
            type: "DELETE",
            url: './api/adm/products/' + id,
            success: () => {
                this.props.onProductAction({type: 'REMOVE', id: id})
            }
        });
    }

    updateHandler(id, data) {
        var current = this.props.data.find((x) => x.id === id)
        var elem = Object.assign({}, current, data)
        $.ajax({
            type: "PUT",
            url: './api/adm/products/',
            data: JSON.stringify(elem),
            success: (elem) => {
                this.props.onProductAction({type: 'UPDATE_ELEMENT', item: elem})
            },
            contentType: "application/json"
        })
    }

    render() {
        var productNodes = this.props.data.map(function (prod) {
            return (
                <ProductViewForAdmin
                    name={prod.name}
                    price={prod.price}
                    image={prod.imageLink}
                    description={prod.description}
                    enabled={prod.enabled}
                    key={prod.id}
                    removeHandler={this.removeHandler.bind(this, prod.id)}
                    updateHandler={this.updateHandler.bind(this, prod.id)}/>
            );
        }.bind(this));
        return (
            <div id="products-list" className="container">
                <NewBoxForm onProductAction={this.props.onProductAction}/>
                {productNodes}
            </div>
        );
    }
}


class ProductViewForAdmin extends React.Component {

    updateEnabled() {
        this.props.updateHandler({enabled: !this.props.enabled})
    }

    render() {
        return (
            <div className="row">
                <div className="box">
                    <CommonProductInfo
                        id={this.props.key}
                        name={this.props.name}
                        price={this.props.price}
                        image={this.props.image}
                        description={this.props.description}/>

                    <button onClick={this.props.removeHandler} className="btn btn-default">
                        Удалить
                    </button>

                    <label className="checkbox-inline">
                        <input
                            type="checkbox"
                            name="enabled"
                            checked={this.props.enabled}
                            onClick={this.updateEnabled.bind(this)}
                        />
                        виден клиентам
                    </label>

                </div>
            </div>

        );
    }
}


export class AdminOrderList extends React.Component {

    componentWillMount() {
        $.ajax({
            url: this.props.url,
            cache: false,
            success: (response) => {
                this.props.onOrderAction({type: 'SET_NEW_DATA', array: response});
            },
            error: (xhr, status, err) => {
                console.error(this.props.url, status, err.toString());
            }
        });
    }

    render() {
        var orderNodes = this.props.data.map(function (ord) {
            return (
                <CommonOrderInfo
                    id={ord.id}
                    status={ord.status}
                    totalAmount={ord.totalAmount}
                    trackingNumber={ord.trackingNumber}
                    customerDetailsInfo={ord.customerDetailsInfo}
                    productInfos={ord.productInfos}
                    addressInfo={ord.addressInfo}
                    key={ord.id}/>
            );
        }.bind(this));

        return (
            <div>{orderNodes}</div>
        )
    }

}

export class CommonOrderInfo extends React.Component {


    render() {
        var products;
        if (this.props.productInfos) {
            products = this.props.productInfos.map(function (prod) {
                return (
                    <div className="row show-grid">
                        <div className="col-md-3">{prod.name}</div>
                        <div className="col-md-3">{prod.price}</div>
                        <div className="col-md-3">{prod.quantity}</div>
                    </div>
                );
            }.bind(this));
        }

        var customerDetails;
        if (this.props.customerDetailsInfo) {
            customerDetails = <div className="row show-grid">
                <div className="col-md-3">{this.props.customerDetailsInfo.lastname}</div>
                <div className="col-md-2">{this.props.customerDetailsInfo.middlename}</div>
                <div className="col-md-2">{this.props.customerDetailsInfo.firstname}</div>
                <div className="col-md-3">{this.props.customerDetailsInfo.email}</div>
                <div className="col-md-2">{this.props.customerDetailsInfo.phone}</div>
            </div>;
        }
        var address;
        if (this.props.addressInfo) {
            address = <div className="row show-grid">
                <div className="col-md-12"> {this.props.addressInfo.city},
                    {this.props.addressInfo.street},
                    {this.props.addressInfo.building},
                    {this.props.addressInfo.suite},
                    {this.props.addressInfo.flat},
                    {this.props.addressInfo.zip}
                </div>
            </div>;
        }

        return (
            <div className="row">
                <div className="box">
                    <form method="POST">

                        <div className="col-md-3">
                            <div>Номер заказа: {this.props.id}</div>
                            <div>
                                Статус:
                                <select className="form-control" name="category">
                                    <option>{this.props.status}</option>
                                </select>
                            </div>
                            <div>
                                Сумма заказа: {this.props.totalAmount}
                            </div>
                            <div>
                                Номер отслеживания:
                                <input type="text"
                                       className="form-control"
                                       name="trackingNumber"
                                       value={this.props.trackingNumber}/>
                            </div>
                        </div>
                        {products}
                        {customerDetails}
                        {address}


                    </form>
                    <div className="clearfix"/>
                </div>
            </div>
        );
    }
}

export class CommonProductInfo extends React.Component {

    handleSubmitOrder(e) {
        e.preventDefault();

        $.ajax({
            type: "POST",
            url: './api/order/',
            data: JSON.stringify({
                isBasket: false,
                productInfos: [
                    {
                        quantity: 1,
                        id: this.props.id
                    }
                ]
            }),
            success: (elem) => {

            },
            contentType: "application/json"
        });
    }


    render() {
        return (
            <div>
                <div className="col-lg-12">
                    <hr />
                    <h2 className="intro-text text-center">
                        {this.props.name}
                    </h2>
                    <hr />
                </div>
                <div className="col-md-6">
                    <div className="productBoxText">{this.props.description}</div>
                    <div className="productBoxPrice">
                        <div>
                            <span className="priceNumber">{this.props.price}</span>
                            <span className="rub">B</span>
                        </div>
                        <div>
                            <form method="POST"
                                  action="https://money.yandex.ru/quickpay/confirm.xml"
                                  onSubmit={this.handleSubmitOrder.bind(this)}>
                                <input type="hidden" value="bookbox" required className="form-control" name="label"/>
                                <input type="hidden" value="true" required className="form-control" name="need-fio"/>
                                <input type="hidden" value="true" required className="form-control" name="need-email"/>
                                <input type="hidden" value="true" required className="form-control"
                                       name="need-address"/>
                                <input type="hidden" value="410012089662277" required className="form-control"
                                       name="receiver"/>
                                <input type="hidden" value="Оплата заказа на BookPleasure.ru" required
                                       className="form-control" name="formcomment"/>
                                <input type="hidden" value="Оплата заказа на BookPleasure.ru" required
                                       className="form-control" name="short-dest"/>
                                <input type="hidden" value="shop" required className="form-control"
                                       name="quickpay-form"/>
                                <input type="hidden" value="Оплата заказа на BookPleasure.ru" required
                                       className="form-control" name="targets"/>
                                <input type="hidden" value="AC" required className="form-control" name="paymentType"/>
                                <input type="hidden" value={this.props.price} required className="form-control"
                                       name="sum"/>

                                <button type="submit" className="btn btn-default">Заказать</button>
                                <span id="submit-result"/>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <img src={'img/products/'+this.props.image}
                         className="img-responsive img-border-left img-thumbnail"
                         alt={this.props.name}/>
                </div>
                <div className="clearfix"/>
            </div>
        );
    }

}


class NewBoxForm extends React.Component {

    handleSubmit(e) {
        e.preventDefault();
        var form = $('form');
        var o = {};
        var list = form.serializeArray();
        $.each(list, function () {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        var fileInput = form.find('input[type=file]')[0];
        if (fileInput.files[0]) {
            var reader = new FileReader();
            reader.readAsBinaryString(fileInput.files[0]);
            reader.onloadend = () => {
                o[fileInput.name] = btoa(reader.result);
                o['imageLink'] = fileInput.files[0].name;

                $.ajax({
                    type: "PUT",
                    url: './api/adm/products/',
                    data: JSON.stringify(o),
                    success: (elem) => {
                        this.props.onProductAction({type: 'ADD', item: elem})
                    },
                    contentType: "application/json"
                });
            };
        }

        return false;

    }

    render() {
        return (
            <div className="row">
                <div className="box">
                    <div className="col-lg-12">
                        <hr />
                        <h2 className="intro-text text-center">
                            Страница редактирования информации о боксах
                        </h2>
                        <hr />
                    </div>
                    <form method="PUT" action="./api/adm/products/" encType="application/json"
                          onSubmit={this.handleSubmit.bind(this)}>
                        <div className="form-group col-md-6">
                            <div>Категория товара:</div>
                            <select className="form-control" name="category">
                                <option>BOOKBOX</option>
                            </select>
                            <div>Название бокса:</div>
                            <input type="text" required className="form-control" name="name"/>
                            <div>Цена:</div>
                            <input type="number" className="form-control" name="price" min={1} max={10000}/>
                            <div>Количество:</div>
                            <input type="number" className="form-control" name="quantity" min={1} max={1000}/>
                            <div>Картинка:</div>
                            <input type="file" required className="form-control" name="base64ImageFile"/>
                        </div>
                        <div className="form-group col-md-6">
                            <div>Описание бокса:</div>
                            <div>
                                <textarea className="form-control" required rows={9} name="description"
                                          defaultValue={""}/>
                            </div>
                        </div>
                        <div className="form-group col-lg-12">
                            <button type="submit" className="btn btn-default">Создать</button>
                            <span id="submit-result"/>
                        </div>
                    </form>
                    <div className="clearfix"/>
                </div>
            </div>

        );
    }
}