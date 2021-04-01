class FavoritesController < ApplicationController
    before_action :set_favorite, only: [:show, :update, :destroy]

    def index
        @favorites = Favorite.all
    
        render json: @favorites
      end
    
      # GET /users/1
      def show
        render json: @favorite
      end
     
      # POST /users
      def create
        @favorite = Favorite.new(favorite_params)
    
        if @favorite.save
          render json: @favorite, status: :created, location: @favorite
        else
          render json: @favorite.errors, status: :unprocessable_entity
        end
      end
    
      # PATCH/PUT /users/1
      def update
        if @favorite.update(favorite_params)
          render json: @favorite
        else
          render json: @favorite.errors, status: :unprocessable_entity
        end
      end
    
      # DELETE /users/1
      def destroy
        @favorite.destroy
        
      end
    
      private
        # Use callbacks to share common setup or constraints between actions.
        def set_favorite
          @favorite = Favorite.find(params[:id])
        end
    
        # Only allow a list of trusted parameters through.
        def favorite_params
          # params.fetch(:favorite, {})
          params.require(:favorite).permit(:constellation_id, :user_id)
        end
    
end
