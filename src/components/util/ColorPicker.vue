<template>
    <div class="color-picker-container">
        <b-input-group>
            <button class="btn btn-secondary" :style="getBtnBackgroundStyle()"></button>
            <b-form-input v-model="hexColor" type="text"></b-form-input>
        </b-input-group>
        <div class="color-picker d-flex flex-row" :style="{display: display}">
            <div class="color-picker-chip" :style="getChipBackgroundStyle()"></div>
            <div class="color-picker-control p-2">
                <div class="control" :style="gradientH()">
                    <input type="range" min="0" max="360" v-model="hue" /> 
                </div>
                <div class="control" :style="gradientS()">
                    <input type="range" min="0" max="100" v-model="saturation" />
                </div>
                <div class="control" :style="gradientL()">
                    <input type="range" min="0" max="100" v-model="lightness" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import ColorSchemer from "../../classes/ColorSchemer";

export default {
    name: "color-picker",

    props: ['color'],

    data: function(){
        return {
            hexColor: null,
            colorSchemer: null,
            display: 'none !important',
        }
    },

    created: function(){
        this.hexColor = this.color;
        /** @type ColorSchemer */
        this.colorSchemer = new ColorSchemer(this.color);
    },

    computed: {
        cssColor: function(){
            let color = this.colorSchemer.hsbToHsl([
                parseFloat(this.colorSchemer.hsl[0]) / 360,
                parseFloat(this.colorSchemer.hsl[1]) / 100,
                parseFloat(this.colorSchemer.hsl[2]) / 100
            ]);

            return color[0] + ", " + color[1] + "%, " + color[2] + "%"; 
        },

        hue:{
            get: function(){
                const hsl = this.colorSchemer.hsl;
                return hsl[0];
            },
            set: function(hue){
                this.colorSchemer.hsl[0] = hue;
                const rgb = this.colorSchemer.hslToRgb();
                this.hexColor = this.colorSchemer.rgbToHex(rgb);
            }
        },

        saturation: {
            get: function(){
                const hsl = this.colorSchemer.hsl;
                return hsl[1];
            },
            set: function(saturation){
                this.colorSchemer.hsl[1] = saturation;
                const rgb = this.colorSchemer.hslToRgb();
                this.hexColor = this.colorSchemer.rgbToHex(rgb);
            }
        },

        lightness: {
            get: function(){
                const hsl = this.colorSchemer.hsl;
                return hsl[2];
            },
            set: function(lightness){
                this.colorSchemer.hsl[2] = lightness;
                const rgb = this.colorSchemer.hslToRgb();
                this.hexColor = this.colorSchemer.rgbToHex(rgb);
            }
        }
    },

    methods: {
        getBtnBackgroundStyle: function(){
            return {
                background: "hsl(" + this.cssColor + ")",
                "border-color": "hsl(" + this.cssColor + ")",
            };
        },

        getChipBackgroundStyle: function(){
            return {
                background: "hsl(" + this.cssColor + ")",
            };   
        },

        gradientH: function(){
            let steps = this.colorSchemer.getGradientH();
            return this.getGradientBySteps(steps);
        },

        gradientS: function(){
            let steps = this.colorSchemer.getGradientS();
            return this.getGradientBySteps(steps);
        },

        gradientL: function(){
            let steps = this.colorSchemer.getGradientL();
            return this.getGradientBySteps(steps);
        },

        getGradientBySteps: function(steps){
            let cssSteps = [];
            for(let step of steps){
                let color = step[0] + ", " + step[1] + "%, " + step[2] + "%";
                cssSteps.push("hsl(" + color + ")");
            }
            
            return {
                backgroundImage: "linear-gradient(to right, " + cssSteps.join(', ')
            }
        }
    }
}
</script>
