import React from 'react';

interface TotalBarProps {
  total_amount: number;
}

export const TotalBar: React.FC<TotalBarProps> = ({total_amount}) => (
      <div className="card card-body">
        <div className="d-md-flex align-items-center justify-content-between">
          <div className="media align-sm-items-center">
            <div className="tx-40 tx-lg-60 lh-0 tx-orange">
              <i className="fab fa-bitcoin"></i>
            </div>
            <div className="media-body mg-l-15">
              <h6 className="tx-12 tx-lg-14 tx-semibold tx-uppercase tx-spacing-1 mg-b-5">
                MARKET CAP{' '}
                <span className="tx-normal tx-color-03">(USD)</span>
              </h6>
              <div className="d-flex align-items-baseline">
                <h2 className="tx-20 tx-lg-28 tx-normal tx-rubik tx-spacing--2 lh-2 mg-b-0">
                  ${total_amount}
                </h2>
                <h6 className="tx-11 tx-lg-16 tx-normal tx-rubik tx-danger mg-l-5 lh-2 mg-b-0">
                  -$7.98(0.2006%)
                </h6>
              </div>
            </div>
          </div>
          <div className="d-flex flex-column flex-sm-row mg-t-20 mg-md-t-0">
            <button className="btn btn-sm btn-white btn-uppercase pd-x-15">
              <i data-feather="download" className="mg-r-5"></i> Export CSV
            </button>
            <button className="btn btn-sm btn-white btn-uppercase pd-x-15 mg-t-5 mg-sm-t-0 mg-sm-l-5">
              <i data-feather="share-2" className="mg-r-5"></i> Share
            </button>
            <button className="btn btn-sm btn-white btn-uppercase pd-x-15 mg-t-5 mg-sm-t-0  mg-sm-l-5">
              <i data-feather="eye" className="mg-r-5"></i> Watch
            </button>
          </div>
        </div>
      </div>
);
