import React from 'react';

export const PriceChart: React.FC = () => (
  <div className="card card-crypto">
    <div className="card-header pd-y-8 d-sm-flex align-items-center justify-content-between">
      <nav className="nav nav-line">
        <a href="" className="nav-link">
          Hour
        </a>
        <a href="" className="nav-link active">
          Day
        </a>
        <a href="" className="nav-link">
          Week
        </a>
        <a href="" className="nav-link">
          Month
        </a>
        <a href="" className="nav-link">
          Year
        </a>
        <a href="" className="nav-link">
          All
        </a>
      </nav>
      <div className="tx-12 tx-color-03 align-items-center d-none d-sm-flex">
        <a href="" className="link-01 tx-spacing-1 tx-rubik">
          03/01/2019 <i className="icon ion-ios-arrow-down"></i>
        </a>
        <span className="mg-x-10">to</span>
        <a href="" className="link-01 tx-spacing-1 tx-rubik">
          03/02/2019 <i className="icon ion-ios-arrow-down"></i>
        </a>
      </div>
    </div>
    <div className="card-body pd-10 pd-sm-20">
      <div className="chart-eleven">
        <div id="flotChart1" className="flot-chart"></div>
      </div>
    </div>
    <div className="card-footer pd-20">
      <div className="row row-sm">
        <div className="col-6 col-sm-4 col-md">
          <h6 className="tx-uppercase tx-11 tx-spacing-1 tx-color-03 mg-b-10">
            Market Cap
          </h6>
          <h5 className="tx-normal tx-rubik mg-b-0 mg-r-5 lh-1">$14.5B</h5>
        </div>
        <div className="col-6 col-sm-4 col-md">
          <h6 className="tx-uppercase tx-11 tx-spacing-1 tx-color-03 mg-b-10">
            Volume (24h)
          </h6>
          <h5 className="tx-normal tx-rubik mg-b-0 mg-r-5 lh-1">$4.6B</h5>
        </div>
        <div className="col-6 col-sm-4 col-md mg-t-20 mg-sm-t-0">
          <h6 className="tx-uppercase tx-11 tx-spacing-1 tx-color-03 mg-b-10">
            Change
          </h6>
          <h5 className="tx-normal tx-rubik mg-b-0 mg-r-5 lh-1">
            -$7.98{' '}
            <small className="tx-danger">
              <i className="icon ion-md-arrow-down"></i>
            </small>
          </h5>
        </div>
        <div className="col-6 col-sm-4 col-md-3 col-xl mg-t-20 mg-md-t-0">
          <h6 className="tx-uppercase tx-11 tx-spacing-1 tx-color-03 mg-b-10">
            Supply
          </h6>
          <h5 className="tx-normal tx-rubik mg-b-0 mg-r-5 lh-1">17.59M</h5>
        </div>
        <div className="col-6 col-sm-4 col-md mg-t-20 mg-md-t-0">
          <h6 className="tx-uppercase tx-11 tx-spacing-1 tx-color-03 mg-b-10">
            All Time High
          </h6>
          <h5 className="tx-normal tx-rubik mg-b-0 mg-r-5 lh-1">$18.4K</h5>
        </div>
      </div>
    </div>
  </div>
);
