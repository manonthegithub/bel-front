import React from 'react'
import { connect } from 'react-redux'


class ProductListForAdmin extends React.Component{

  componentDidMount() {
    $.ajax({
      url: this.props.url,
      cache: false,
      success: (response) => {
        this.props.onProductAction({type: 'SET_NEW_DATA', array: response})
      },
      error: (xhr, status, err) => {
        console.error(this.props.url, status, err.toString());
      }
    });
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
            id={prod.id}
            onProductAction={this.props.onProductAction}/>
      );
    }.bind(this));
    return (
      <div id="products-list" className="container">
        <NewBoxForm onProductAction={this.props.onProductAction}/>
        {productNodes}
      </div>
    );
  }
};


class ProductViewForAdmin  extends React.Component{

  removeHandler(id){
    $.ajax({
      type: "DELETE",
      url: './api/adm/boxes/'+ id,
      success: () => {
          this.props.onProductAction({type:'REMOVE',id: id})
      }
    });
  }

  render() {
    return(
        <div className="row">
            <div className="box">
                <CommonProductInfo
                    name={this.props.name}
                    price={this.props.price}
                    image={this.props.image}
                    description={this.props.description} />

                <button onClick={this.removeHandler} className="btn btn-default">
                    Удалить
                </button>

                <label className="checkbox-inline">
                    <input type="checkbox" name="enabled" checked={this.props.enabled} defaultValue="true" />
                    виден клиентам
                </label>

            </div>
        </div>

    );
  }
};

class NewBoxForm  extends React.Component{

    handleSubmit(e){
        e.preventDefault();
        var form = $('form');
        var o = {};
        var list = form.serializeArray();
        $.each(list, function() {
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
        if(fileInput.files[0]){
            var reader = new FileReader();
            reader.readAsBinaryString(fileInput.files[0]);
            reader.onloadend =  () => {
                o[fileInput.name] = btoa(reader.result);
                o['imageLink'] = fileInput.files[0].name;

                $.ajax({
                  type: "PUT",
                  url: './api/adm/boxes/',
                  data: JSON.stringify(o),
                  success: (elem) => {
                    this.props.onProductAction({type:'ADD',item: elem})
                  },
                  contentType : "application/json"
                });
            };
        }

        return false;

    }


    render(){
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
          <form method="PUT" action="./api/adm/boxes/" encType="application/json" onSubmit={this.handleSubmit}>
            <div className="form-group col-md-6">
              <input type="hidden" required className="form-control" name="category" defaultValue="BOOKBOX" />
              <div>Название бокса :</div><input type="text" required className="form-control" name="name" />
              <div>Цена :</div><input type="number" className="form-control" name="price" min={1} max={10000} />
              <div>Количество :</div><input type="number" className="form-control" name="quantity" min={1} max={1000} />
              <div>Картинка :</div><input type="file" required className="form-control" name="base64ImageFile" />
            </div>
            <div className="form-group col-md-6">
              <div>Описание бокса :</div>
              <div>
                <textarea className="form-control" required rows={9} name="description" defaultValue={""} />
              </div>
            </div>
            <div className="form-group col-lg-12">
              <button type="submit" className="btn btn-default">Создать</button>
              <span id="submit-result" />
            </div>
          </form>
          <div className="clearfix" />
        </div>
      </div>

        );
    }
};

export class CommonProductInfo extends React.Component{
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
                <div>{this.props.description}</div>
                <div>
                    <span>{this.props.price}</span>
                    <span className="rub">B</span>
                </div>
              </div>
              <div className="col-md-6">
                <img className="img-responsive img-border-left" src={'img/products/'+this.props.image} alt={this.props.name} />
              </div>
              <div className="clearfix" />
           </div>
        );
  }

}


const mapStateToProps = (state) => {
  return {
    data: state.data
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onProductAction: (action) => dispatch(action)
  }
}

export const AdminProductList = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductListForAdmin)
