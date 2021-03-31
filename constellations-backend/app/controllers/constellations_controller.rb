class ConstellationsController < ApplicationController
  before_action :set_constellation, only: [:show, :update, :destroy]

  # GET /constellations
  def index
    @constellations = Constellation.all

    render json: @constellations, include: [:users]
  end

  # GET /constellations/1
  def show
    constellation = Constellation.find_by(id: params[:id])
    render json: @constellation, :include => [:users]
  end

  # POST /constellations
  def create
    @constellation = Constellation.new(constellation_params)

    if @constellation.save
      render json: @constellation, status: :created, location: @constellation
    else
      render json: @constellation.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /constellations/1
  def update
    if @constellation.update(constellation_params)
      render json: @constellation
    else
      render json: @constellation.errors, status: :unprocessable_entity
    end
  end

  # DELETE /constellations/1
  def destroy
    @constellation.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_constellation
      @constellation = Constellation.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def constellation_params
      params.require(:constellation).permit(:name, :image)
    end
end
