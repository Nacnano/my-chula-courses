`timescale 1ns / 1ps

module system(
    output [6:0] seg,
    output dp,
    output [3:0] an,
    input [16:0] sw, // 15 is the most left
    input btnU, 
    input btnC, 
    input btnL,
    input btnR, 
    input btnD,
    input clk
    );
    
    wire [3:0] num3,num2,num1,num0; // left to right
    
    wire an0,an1,an2,an3;
    assign an={an3,an2,an1,an0};
 
    ////////////////////////////////////////
    // Clock
    wire targetClk;
    wire [18:0] tclk;
    
    assign tclk[0]=clk;
    
    genvar c;
    generate for(c=0;c<18;c=c+1) begin
        clockDiv fDiv(tclk[c+1],tclk[c]);
    end endgenerate
    
    clockDiv fdivTarget(targetClk,tclk[18]);
    
    wire targetClk1Hz;
    clockDiv1Hz fdivTarget1Hz(targetClk1Hz, clk);
    
    ////////////////////////////////////////
    // Synchronizer
    wire [16:0] d,notd,d2,notd2;
    genvar n;
    generate for(n=0;n<16;n=n+1) begin
        dFlipflop dFF2(d2[n],notd2[n],sw[n],targetClk);
        dFlipflop dFF(d[n],notd[n],d2[n],targetClk);
    end endgenerate
    
    ////////////////////////////////////////
    // Single Pulser
    wire up0,up1,up2,up3,down0,down1,down2,down3;
    singlePulser spUP3(up3,d[7],targetClk);
    singlePulser spDOWN3(down3,d[6],targetClk);
    singlePulser spUP2(up2,d[5],targetClk);
    singlePulser spDOWN2(down2,d[4],targetClk);
    singlePulser spUP1(up1,d[3],targetClk);
    singlePulser spDOWN1(down1,d[2],targetClk);
    singlePulser spUP0(up0,d[1],targetClk);
    singlePulser spDOWN0(down0,d[0],targetClk);
    
    //////////////////////////////////////////////////

    // Convert binary switch value to decimal
    wire [14:0] binary_value;
    assign binary_value = sw; // Binary value from switches
    
    wire [3:0] ones, tens, hundreds, thousands;

    // Assign digits to the display numbers
    bcd_convert temp(thousands, hundreds, tens, ones, binary_value);

    assign num0 = ones;
    assign num1 = tens;
    assign num2 = hundreds;
    assign num3 = thousands;

    ////////////////////////////////////////
    // Display
    quadSevenSeg q7seg(seg,dp,an0,an1,an2,an3,num0,num1,num2,num3,targetClk);
    
endmodule