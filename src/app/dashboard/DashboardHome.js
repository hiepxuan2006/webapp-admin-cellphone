import React from "react"

export const DashboardHome = () => {
  return (
    <div className="DashboardHome">
      <div className="row SectionInner">
        <div className="col col-md-3">
          <div class="card text-white bg-success mb-3">
            <div class="card-header">Sản phẩm</div>
            <div class="card-body">
              <h class="card-title">Tổng số sản phẩm</h>
              <div class="card-text">
                <div className="Circle">
                  <div className="Circle_content">
                    <h1>20</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col col-md-3">
          <div class="card text-white bg-success mb-3">
            <div class="card-header">Order</div>
            <div class="card-body">
              <h class="card-title">Tổng số sản phẩm</h>
              <div class="card-text">
                <div className="Circle">
                  <div className="Circle_content">
                    <h1>20</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col col-md-3">
          <div class="card text-white bg-success mb-3">
            <div class="card-header">Khách hàng</div>
            <div class="card-body">
              <h class="card-title">Tổng số khachs hàng</h>
              <div class="card-text">
                <div className="Circle">
                  <div className="Circle_content">
                    <h1>20</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col col-md-3">
          <div class="card text-white bg-success mb-3">
            <div class="card-header">Bài viết</div>
            <div class="card-body">
              <h class="card-title">Tổng số bài viết</h>
              <div class="card-text">
                <div className="Circle">
                  <div className="Circle_content">
                    <h1>20</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
