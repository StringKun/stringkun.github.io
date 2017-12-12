function Triangle(								//�����������������������
	gl,						 					//GL������
	programIn									//��ɫ������id
){
	//this.vertexData=vertexDataIn;						//��ʼ��������������
	this.vertexData= [3.0,0.0,0.0,
					  0.0,0.0,0.0,
					  0.0,3.0,0.0];
	this.vcount=this.vertexData.length/3;					//�õ���������
	this.vertexBuffer=gl.createBuffer();				//���������������ݻ���
	gl.bindBuffer(gl.ARRAY_BUFFER,this.vertexBuffer); 	//�󶨶����������ݻ���
	//�����������������뻺��
	gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(this.vertexData),gl.STATIC_DRAW);

    //���ն���������������
   this.vertexTexCoor= [0.0, 1.0, 1.0, 1.0, 1.0, 0.0];
    //���������������껺��
    this.vertexTexCoorBuffer=gl.createBuffer();
    //���������������������뻺��
    gl.bindBuffer(gl.ARRAY_BUFFER,this.vertexTexCoorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(this.vertexTexCoor),gl.STATIC_DRAW);

    this.program=programIn;		//��ʼ����ɫ������id

    //��������
    gl.uniform1i(gl.getUniformLocation(this.program, "sTexture"), 0);

	this.drawSelf=function(ms, tex)//��������ķ���
	{	
		gl.useProgram(this.program);//ָ��ʹ��ĳ����ɫ������
		//��ȡ�ܱ任��������id
		var uMVPMatrixHandle=gl.getUniformLocation(this.program, "uMVPMatrix");
		//���ܱ任����������Ⱦ����
		gl.uniformMatrix4fv(uMVPMatrixHandle,false,new Float32Array(ms.getFinalMatrix()));
		
		gl.enableVertexAttribArray(gl.getAttribLocation(this.program, "aPosition"));//���ö���������������
		gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);	//�󶨶����������ݻ���
		//������ָ��������������
		gl.vertexAttribPointer(gl.getAttribLocation(this.program,"aPosition"),3,gl.FLOAT,false,0, 0);

        //����������������
        gl.enableVertexAttribArray(gl.getAttribLocation(this.program, "aTexCoor"));
        //������������������������Ⱦ����
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexTexCoorBuffer);
        gl.vertexAttribPointer(gl.getAttribLocation(this.program, "aTexCoor"), 2, gl.FLOAT, false, 0, 0);			//һ��Ҫÿ�ζ�ȡ���󶨣������￨�˺ܾ�

        var isImg = gl.getUniformLocation(this.program, 'isImg');
        if(tex){
            // gl.activeTexture(gl.TEXTURE0);
            gl.uniform1i(isImg, true);
		}else{
            gl.uniform1i(isImg, false);
		}

        //һ��Ҫÿ�ζ�ȡ���󶨣������￨�˺ܾ�
        gl.drawArrays(gl.TRIANGLES, 0, this.vcount);		//�ö��㷨��������
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.bindTexture(gl.TEXTURE_2D, null);
	}
}
